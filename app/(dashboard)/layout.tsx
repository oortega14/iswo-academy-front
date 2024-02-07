import { Toaster } from "sonner";

export default function AdminLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
