export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <div className="bg-light-dotted dark:bg-dark-dotted"></div>
      {children}
    </div>
  );
}
