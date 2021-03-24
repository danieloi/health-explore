import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import urlWithQuery, { addSortQuery } from "utils/client";

export default function JobsSortOptionsList() {
  return (
    <div className="hidden md:flex items-center">
      <span className="text-gray-400 pr-2">Sort by</span>
      <ul className="flex flex-auto">
        <SortKey value="Location" />
        <SortKey value="Role" />
        <SortKey value="Department" />
        <SortKey value="Education" />
        <SortKey value="Experience" />
      </ul>
    </div>
  );
}

function SortKey({ value }) {
  return (
    <li className="p-2 sort-option relative cursor-default hover:bg-gray-100">
      <span>{value}</span>
      <AscOrDesc value={value} />
    </li>
  );
}

function AscOrDesc({ value }) {
  const router = useRouter();

  const { query } = router;

  return (
    <ul className="sort-option-list absolute border border-gray-100 w-24 text-center bg-white">
      <Link
        href={urlWithQuery("/jobs", {
          ...query,
          sort: addSortQuery(query.sort || "", value, "asc"),
        })}
      >
        <li className="my-1 flex">
          <button className="mx-2 bg-gray-100 rounded-sm flex-auto ">
            A - Z
          </button>
        </li>
      </Link>
      <Link
        href={urlWithQuery("/jobs", {
          ...query,
          sort: addSortQuery(query.sort || "", value, "desc"),
        })}
      >
        <li className="my-1 flex">
          <button className="mx-2 bg-gray-100 rounded-sm flex-auto">
            Z - A
          </button>
        </li>
      </Link>
    </ul>
  );
}
