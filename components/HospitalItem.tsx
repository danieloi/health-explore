import useToggle from "hooks/useToggle";
import { isEmpty, map, orderBy, reduce } from "lodash";
import React from "react";
import { Hospital, Job, Order, SortMap, SortOptions } from "types";
import JobItem from "./JobItem";

type Props = {
  hospital: Hospital;
  sortMap: SortMap;
};

export default function HospitalItem({ hospital, sortMap }: Props) {
  const { state: isExpanded, toggleState: toggleIsExpanded } = useToggle();

  if (!hospital.items) {
    return null;
  }

  const items = sortJobs(hospital.items, sortMap);

  return (
    <li className="mt-3">
      <button
        className="px-3 py-2.5 w-full border-none text-left"
        onClick={toggleIsExpanded}
      >
        <h4 className="flex space-x-2 items-center">
          <span
            className={
              "bg-gray-400 rounded-md py-2 w-8 font-bold text-white leading-none text-center"
            }
          >
            {getInitials(hospital.name)}
          </span>
          <span>
            {hospital.items.length} jobs for {hospital.name}
          </span>
        </h4>
      </button>
      <ul>
        {isExpanded &&
          map(items, (job) => <JobItem key={job.job_id} job={job} />)}
      </ul>
    </li>
  );
}

/**
 *
 * Here are the different explanations of the
 * sort options
 *
 * * BY LOCATION *
 * To do so is to sort by
 * name alphabetically
 *
 *
 * * BY ROLE *
 * by job_title alphabetical ranking
 *
 * * BY DEPARTMENT *
 *
 * use the first item in the array's ranking alphabetically
 *
 *
 * * BY EDUCATION *
 * first item in required_credentials array alphabetical ranking
 *
 *
 *
 * * BY EXPERIENCE *
 * Just use the first value in the array of required skills
 *
 */

function sortJobs(jobs: Job[], sortMap: SortMap) {
  if (isEmpty(sortMap)) {
    return jobs;
  }

  const sortKey = {
    Role: "job_title",
    Department: "department",
    Education: "required_skills",
    Experience: "experience",
  };

  let orders: Order[] = [];

  const functions = map(sortMap, (val, key: SortOptions) => {
    /**
     * so orders match functions array order
     */
    orders = [...orders, val];
    if (/Department|Education/.test(key)) {
      return (job: Job) => job[sortKey[key]][0];
    }
    return (job: Job) => job[sortKey[key]];
  });

  return orderBy(jobs, functions, orders);
}

export function getInitials(name) {
  const parts = name.split(" ").slice(0, 2);
  return reduce(parts, (res, part) => res + part[0], "");
}
