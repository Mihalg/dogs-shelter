import ExpensesList from "@/app/(general)/_components/ExpensesList";
import Spinner from "@/app/_components/Spinner";
import paw from "@/public/greenPawBig.png";
import Image from "next/image";
import { Suspense } from "react";

function Expenses() {
  return (
    <div className="px-6 py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 text-dark-300 lg:min-h-[550px]">
        <h2 className="mx-auto flex items-center gap-6 text-4xl font-bold text-primary-100 lg:text-5xl">
          <Image src={paw} alt="" height={55} width={55} />
          Wydatki
        </h2>
        <div className="grid grid-cols-1 gap-y-2">
          <Suspense fallback={<Spinner />}>
            <ExpensesList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
