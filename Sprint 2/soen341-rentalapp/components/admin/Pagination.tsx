"use client";

import useCustomRouter from "@/lib/hooks/useCustomRouter";

const Pagination = ({ totalPage }: { totalPage: number }) => {
  const newArray = [...Array(totalPage)].map((_, i) => i + 1);

  const { pushQuery, query } = useCustomRouter();
  return (
    <div className="flex justify-center gap-3">
      {newArray.map((page) => (
        <button
          className={`${page == (query.page || 1) ? "bg-cyan-900" : "bg-cyan-600"} cursor-pointer rounded-lg px-2 py-2 font-bold text-white`}
          key={page}
          onClick={() => pushQuery({ page })}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
