import Sidebar from "@/components/Sidebar";
import QueryProvider from "../providers/query-provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-6">
          <QueryProvider>{children}</QueryProvider>
        </div>
      </main>
    </div>
  );
}
