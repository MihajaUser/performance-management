//frontend/app/layout.tsx
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}  <Toaster richColors position="bottom-right" /></body>
    </html>
  );
}
  