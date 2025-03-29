import { browserClient } from "@/app/_utils/supabase/client";
import ExpenseRow from "./ExpensesRow";

async function AnnouncementsList({
  searchParams,
}: {
  searchParams?: Promise<{
    tytul?: string;
    dataDo?: string;
    dataOd?: string;
  }>;
}) {
  const supabase = browserClient();

  let { data: expenses } = await supabase
    .from("expenses")
    .select("id, title, created_at");

  const params = await searchParams;
  const {
    tytul: title,
    dataDo: toDate,
    dataOd: fromDate,
  } = params ? params : {};

  if (toDate) {
    expenses =
      expenses?.filter(
        (expense) =>
          new Date(toDate).getTime() - new Date(expense.created_at).getTime() >=
          0,
      ) || null;
  }

  if (fromDate) {
    expenses =
      expenses?.filter(
        (expense) =>
          new Date(fromDate).getTime() -
            new Date(expense.created_at).getTime() <=
          0,
      ) || null;
  }

  if (title) {
    expenses =
      expenses?.filter((expense) => expense.title?.includes(title)) || null;
  }

  return expenses?.length ? (
    expenses
      ?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .map((expense) => <ExpenseRow key={expense.id} expense={expense} />)
  ) : (
    <p className="mt-10 w-full text-center text-2xl">Brak Wydatków</p>
  );
}

export default AnnouncementsList;
