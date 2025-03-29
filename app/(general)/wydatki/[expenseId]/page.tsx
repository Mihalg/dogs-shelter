import { getMonthName } from "@/app/_lib/utils";
import { browserClient } from "@/app/_utils/supabase/client";
import ImagesView from "../../_components/ImagesView";

async function ExpensePage({
  params,
}: {
  params: Promise<{ expenseId: string }>;
}) {
  const { expenseId: id } = await params;

  const supabase = browserClient();
  const { data: expense } = await supabase
    .from("expenses")
    .select("*")
    .eq("id", +id)
    .single();

  if (expense) {
    const date = new Date(expense.created_at);
    const day = date.getDate();
    const month = getMonthName(date.getMonth() + 1);
    const year = date.getFullYear();

    return (
      <div className="mx-auto min-h-[550px] max-w-[1200px] px-4 py-2 text-dark-200 lg:py-10">
        <div className="mb-6 flex flex-col items-center text-2xl font-semibold">
          <p>{expense.title}</p>
          <p>
            {day} {month} {year}
          </p>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ImagesView src={expense.images} width={400} height={400} alt="" />
        </div>
      </div>
    );
  }
}

export default ExpensePage;
