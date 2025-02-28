import NavBar from "../../_navigation/NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <NavBar />
      <main className="w-full px-6 py-4 text-dark-200">{children}</main>
    </div>
  );
}
