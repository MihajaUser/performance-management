// app/layout.tsx
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Performance Management',
  description: 'Employee performance tracking system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100 text-gray-800">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 space-y-4">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav className="flex flex-col space-y-2">
            <Link href="/dashboard" className="hover:text-blue-600">🏠 Overview</Link>
            <Link href="/employees" className="hover:text-blue-600">👥 Employees</Link>
            <Link href="/settings" className="hover:text-blue-600">⚙️ Settings</Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-10">{children}</main>
      </body>
    </html>
  );
}
