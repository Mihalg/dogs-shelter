import { getMonthName } from "@/app/_lib/utils";
import { browserClient } from "@/app/_utils/supabase/client";
import Link from "next/link";

async function ExpensesList() {
  const supabase = browserClient();
  const { data: expenses } = await supabase
    .from("expenses")
    .select("id, title, created_at");

  return expenses?.length ? (
    expenses?.map((expense) => {
      const date = new Date(expense.created_at);
      const day = date.getDate();
      const month = getMonthName(date.getMonth() + 1);
      const year = date.getFullYear();

      return (
        <Link
          href={`/wydatki/${expense.id}`}
          key={expense.id}
          className="flex w-full justify-between rounded-md border px-4 py-2 text-lg text-dark-200 transition-colors hover:bg-light-100"
        >
          <p>{expense.title}</p>
          <p>
            {day} {month} {year}
          </p>
        </Link>
      );
    })
  ) : (
    <p className="text-center text-2xl font-semibold text-dark-200">
      Brak wydatków
    </p>
  );
}

export default ExpensesList;
