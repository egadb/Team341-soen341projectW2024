"use client";

import useCustomRouter from "@/lib/hooks/useCustomRouter";

const SearchForm = () => {
  const { pushQuery, query } = useCustomRouter();

  async function handleSearch(formData: any) {
    const search = formData.get("search");
    pushQuery({ search, page: 1 });
  }

  return (
    <form action={handleSearch} className="flex place-content-between gap-3">
      <input
        placeholder="Type to search..."
        type="search"
        name="search"
        className="rounded-xl"
        defaultValue={query.search || ""}
      />
      <button className="cursor-pointer rounded-lg bg-green-600 px-6 py-2 font-bold text-white">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
