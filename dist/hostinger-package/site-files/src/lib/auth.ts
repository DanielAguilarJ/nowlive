// Simple auth system for admin dashboard
// In production, you should use a proper auth solution like NextAuth.js

import { cookies } from 'next/headers';
import { prisma } from './prisma';
import bcrypt from 'bcrypt';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const AUTH_COOKIE_NAME = 'creamostech_admin_session';

export async function validateCredentials(
  email: string,
  password: string
): Promise<AdminUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error('Error validating credentials:', error);
    return null;
  }
}

export async function createSession(user: AdminUser): Promise<string> {
  // Create a simple session token
  const sessionData = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  
  // In production, use proper JWT signing
  return Buffer.from(JSON.stringify(sessionData)).toString('base64');
}

export async function verifySession(token: string): Promise<AdminUser | null> {
  try {
    const sessionData = JSON.parse(Buffer.from(token, 'base64').toString());
    
    if (sessionData.exp < Date.now()) {
      return null; // Session expired
    }
    
    return {
      id: sessionData.userId,
      email: sessionData.email,
      name: sessionData.name,
      role: sessionData.role,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);
  
  if (!sessionCookie?.value) {
    return null;
  }
  
  return verifySession(sessionCookie.value);
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
