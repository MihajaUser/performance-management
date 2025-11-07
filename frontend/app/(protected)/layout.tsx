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
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fixe */}
      <Sidebar isCollapsed={isCollapsed} />

      {/* Contenu principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar onToggleSidebar={() => setIsCollapsed(!isCollapsed)} />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-2">
            <QueryProvider>{children}</QueryProvider>
          </div>
        </main>
      </div>
    </div>
  );
}
