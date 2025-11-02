"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart2,
  Award,
  LogOut,
  Menu,
  Briefcase
} from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/employees", label: "Employés", icon: Users },
  { href: "/evaluations", label: "Évaluations", icon: ClipboardList },
  { href: "/competencies", label: "Compétences", icon: Award },
  { href: "/scores", label: "Scores & Rapports", icon: BarChart2 },
  { href: "/admin", label: "Administration", icon: Briefcase },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleLogout() {
    document.cookie = "auth_token=; Max-Age=0; path=/;";
    router.push("/login");
  }

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between shrink-0">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-gray-900">
            Performance Manager
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                ${
                  isActive
                    ? "bg-[#002B5B]/10 text-[#002B5B] font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
              title={isCollapsed ? link.label : undefined}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? "text-[#002B5B]" : "text-gray-500"
                }`}
              />
              {!isCollapsed && (
                <span className="text-sm">{link.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-200 shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all"
          title={isCollapsed ? "Déconnexion" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="text-sm font-medium">Déconnexion</span>
          )}
        </button>
      </div>
    </aside>
  );
}
