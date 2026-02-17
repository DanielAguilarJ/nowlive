'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { validateCredentials, createSession, AUTH_COOKIE_NAME, logout as logoutFn } from '@/lib/auth';

export interface LoginState {
  error?: string;
  success?: boolean;
}

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Por favor, completa todos los campos' };
  }

  const user = await validateCredentials(email, password);

  if (!user) {
    return { error: 'Credenciales incorrectas' };
  }

  const sessionToken = await createSession(user);
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });

  redirect('/admin');
}

export async function logout(): Promise<void> {
  await logoutFn();
  redirect('/admin/login');
}
