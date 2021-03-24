import { formatDistanceToNow } from "date-fns";
import useToggle from "hooks/useToggle";
import React from "react";
import { Job } from "types";

type Props = {
  job: Job;
};
export default function JobItem({ job }: Props) {
  const { state: isExpanded, toggleState: toggleIsExpanded } = useToggle();

  return (
    <li className="border-t px-3 border-gray-200">
      <button className="py-3 text-left w-full" onClick={toggleIsExpanded}>
        <h4 className="font-bold">{job.job_title}</h4>
        <p className="md:flex items-center space-x-2">
          <span className="align-middle">{job.job_type}</span>
          <span className="align-middle">{" | "}</span>
          <span className="align-middle">
            <Rate dollarAmount={job.salary_range[0]} /> -{" "}
            <Rate dollarAmount={job.salary_range[1]} />
          </span>
          <span className="align-middle">{" | "}</span>
          <span className="align-middle">{job.city}</span>
          <span className="md:flex-auto" />
          <span className="inline-block align-middle">
            {formatDistanceToNow(new Date(job.created))}
          </span>
        </p>
      </button>
      {isExpanded && <JobDetails job={job} />}
    </li>
  );
}

function Rate({ dollarAmount }) {
  if (!dollarAmount) return null;

  return <span>${dollarAmount}</span>;
}

function JobDetails({ job }: Props) {
  return (
    <div className="flex flex-wrap sm:flex-nowrap">
      <div className="flex-auto">
        <div className="md:flex py-2">
          <h4 className="font-bold w-2/6">Department</h4>
          <span className="w-3/6">{job.department?.join(", ")}</span>
        </div>
        <div className="md:flex py-2">
          <h4 className="font-bold w-2/6">Hours / shifts</h4>
          <span className="w-3/6">
            {job.hours} hours / {job.work_schedule}
          </span>
        </div>
        <div className="md:flex py-2">
          <h4 className="font-bold w-2/6">Summary</h4>
          <span className="w-3/6">{job.description}</span>
        </div>
      </div>
      <div className="md:flex flex-col sm:w-32 sm:flex-none justify-center items-end">
        <button className="bg-blue-500 text-white rounded-md px-3 py-1 mb-3">
          Job details
        </button>
        <button className="ml-4 md:ml-0 border border-blue-500 text-blue-500 rounded-md px-3 py-1">
          Save Job
        </button>
      </div>
    </div>
  );
}
