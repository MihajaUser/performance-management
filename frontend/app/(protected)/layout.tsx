import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import QueryProvider from "../providers/query-provider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fixe */}
      <Sidebar />

      {/* Contenu principal avec topbar */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar /> {/* ✅ Topbar toujours visible */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-2">
            <QueryProvider>{children}</QueryProvider>
          </div>
        </main>
      </div>
    </div>
  );
}
