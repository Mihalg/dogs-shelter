import { serverClient } from "@/app/_utils/supabase/server";
import { redirect } from "next/navigation";

async function Dashboard() {
  const supabase = await serverClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  } else redirect("/admin/panel/aktualnosci");
}

export default Dashboard;
