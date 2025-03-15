import { serverClient } from "@/app/_utils/supabase/server";
import NavBar from "../../_navigation/NavBar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await serverClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin");
  } else
    return (
      <div className="flex">
        <NavBar />
        <main className="w-full px-6 py-4 text-dark-200">{children}</main>
      </div>
    );
}
