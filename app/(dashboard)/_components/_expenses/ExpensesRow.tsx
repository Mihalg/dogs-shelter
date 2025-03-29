import { deleteExpense } from "@/app/_lib/actions";
import RowDropdownMenu from "../RowDropdownMenu";

function ExpenseRow({
  expense,
}: {
  expense: {
    id: number;
    title: string;
    created_at: string;
  };
}) {
  const date = new Date(expense.created_at);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <div
      className={`grid h-[60px] grid-cols-[1fr_1fr_0.4fr] items-center gap-x-2 py-2`}
    >
      <div>{expense.title}</div>
      <div>
        {day < 10 ? `0${day}` : day}-{month < 10 ? `0${month}` : month}-{year}
      </div>
      <div>
        <RowDropdownMenu
          id={expense.id}
          paramName="expenseId"
          deleteFn={deleteExpense}
        />
      </div>
    </div>
  );
}

export default ExpenseRow;
