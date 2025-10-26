"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/employees", label: "Employees" },
  { href: "/reports", label: "Reports" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

    function handleLogout() {
    document.cookie = 'auth_token=; Max-Age=0; path=/;';
    router.push('/login');
  }

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Performance Manager</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 rounded hover:bg-gray-700 ${
              pathname === link.href ? "bg-gray-800 font-semibold" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
         <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-600 py-2 rounded"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
