"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filters = [
  { filter: "all", label: "All cabins" },
  { filter: "small", label: "1-3 guests" },
  { filter: "medium", label: "4-7 guests" },
  { filter: "large", label: "8-12 guests" },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleClick(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      {filters.map((item) => (
        <Button
          activeFilter={activeFilter}
          handleClick={handleClick}
          filter={item.filter}
          key={item.filter}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}

function Button({ children, filter, handleClick, activeFilter }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleClick(filter)}
    >
      {children}
    </button>
  );
}
