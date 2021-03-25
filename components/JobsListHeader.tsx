import React, { useContext } from "react";
import { Context } from "contexts/Context";
import { isString, map, reduce } from "lodash";
import JobsSortOptionsList from "./JobsSortOptionsList";
import { useRouter } from "next/router";
import urlWithQuery, { getSortMap, removeSortQuery } from "utils/client";
import { SortMap } from "types";
import Link from "next/link";

export default function JobsListHeader() {
  const context = useContext(Context);
  const { hospitals } = context;

  const count = reduce(
    hospitals,
    function (result, value) {
      return (result += value.items.length);
    },
    0
  );

  return (
    <header className="px-2 sm:px-0 flex py-2 items-center flex-wrap ">
      <div className="flex-auto space-x-2">
        <span className="font-bold">{count}</span>
        <span>job posting{count === 1 ? "" : "s"}</span>
      </div>
      <JobsSortOptionsList />
      <ChosenSort />
    </header>
  );
}

function ChosenSort() {
  const { query } = useRouter();

  let sort: Partial<SortMap> = {};
  if (isString(query.sort)) {
    sort = getSortMap(query.sort);
  }

  return (
    <ul className="hidden  top-8 md:flex flex-none p-2 w-full items-center flex-wrap justify-end">
      {map(sort, (order, value) => (
        <li
          key={value}
          className="flex px-2 py-1 items-center space-x-1 border border-gray-200 rounded-md m-1"
        >
          <span>{value}</span>
          <span className="px-1 pb-0.5 bg-gray-400 rounded-md text-white">
            {order}
          </span>
          <Link
            href={urlWithQuery("/jobs", {
              ...query,
              sort: removeSortQuery(query.sort, value + ":" + order),
            })}
          >
            <button className="bg-gray-500 text-white w-4 h-4 rounded-full leading-none">
              <span className="inline-block relative bottom-0.5">x</span>
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
