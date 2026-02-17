import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

export const metadata = {
  title: 'Admin Dashboard | CreamosTech',
  description: 'Panel de administración de CreamosTech',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-primary-900">
      {/* Sidebar */}
      <AdminSidebar user={session} />

      {/* Main content area */}
      <div className="lg:pl-72">
        <AdminHeader user={session} />
        
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
