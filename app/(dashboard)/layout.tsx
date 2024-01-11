import { Toaster } from "sonner";

export default function AdminLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Toaster theme="system" position="top-right" richColors  />
    </div>
  );
}
