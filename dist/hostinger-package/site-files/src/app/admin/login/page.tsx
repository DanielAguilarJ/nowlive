import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Admin Login | CreamosTech',
  description: 'Acceso al panel de administración de CreamosTech',
};

export default async function AdminLoginPage() {
  const session = await getSession();

  if (session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-accent-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-success-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Login card */}
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-primary-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">CreamosTech Admin</h1>
            <p className="text-primary-300 mt-2">Accede al panel de administración</p>
          </div>

          <LoginForm />

          {/* Demo credentials info */}
          <div className="mt-6 p-4 bg-primary-700/30 rounded-lg border border-primary-600/30">
            <p className="text-xs text-primary-400 text-center">
              <strong className="text-primary-300">Demo:</strong> admin@creamostech.com / admin123
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-primary-400 text-sm mt-6">
          © 2026 CreamosTech. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
