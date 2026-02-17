'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  service?: string;
  budget?: string;
}

export interface ContactFormState {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const data: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string | undefined,
      company: formData.get('company') as string | undefined,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      service: formData.get('service') as string | undefined,
      budget: formData.get('budget') as string | undefined,
    };

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        success: false,
        error: 'Por favor, completa todos los campos requeridos',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: 'Por favor, introduce un email válido',
      };
    }

    // Save to database
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        subject: data.subject,
        message: data.message,
        service: data.service,
        budget: data.budget,
        status: 'new',
      },
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        type: 'contact',
        action: 'Nuevo mensaje',
        description: `${data.name} - ${data.subject}`,
      },
    });

    // Revalidate admin pages
    revalidatePath('/admin');
    revalidatePath('/admin/messages');

    return {
      success: true,
      message: '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.',
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error: 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.',
    };
  }
}
