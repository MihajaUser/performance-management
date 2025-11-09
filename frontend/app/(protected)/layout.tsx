// frontend/app/(protected)/layout.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import QueryProvider from "../providers/query-provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} />

      {/* Contenu principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar onToggleSidebar={() => setIsCollapsed(!isCollapsed)} />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="bg-white shadow-md rounded-lg p-6 min-h-[85vh]">
              <QueryProvider>{children}</QueryProvider>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
