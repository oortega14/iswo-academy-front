export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      {children}
    </div>
  );
}
