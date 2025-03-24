import { ReactNode } from "react";

function Table({
  columnsTemplate,
  columnsTitles,
  children,
}: {
  columnsTemplate: string;
  columnsTitles: string[];
  children: ReactNode;
}) {
  return (
    <div role="table" className="h-content min-h-[400px] w-full min-w-[500px]">
      <div
        role="header"
        className={`grid w-full gap-x-2 border-b-2 border-light-300 py-2 text-lg text-dark-300 grid-cols-${columnsTemplate}`}
      >
        {columnsTitles.map((title, i) => (
          <div key={i}>{title}</div>
        ))}
      </div>
      <div role="body" className="relative divide-y-2 divide-light-200">
        {children}
      </div>
    </div>
  );
}

export default Table;
