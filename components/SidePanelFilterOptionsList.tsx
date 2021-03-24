import React from "react";
import { map } from "lodash";
import JobFilterCard from "./JobFilterCard";
import useSWR from "swr";
import { Filters } from "types";

export default function SidePanelFilterOptionsList() {
  const { data: filters } = useSWR<Filters>("/api/filters");

  return (
    <section className="hidden md:block md:w-96">
      <ul className="flex flex-col">
        {map(filters, (options, key) => (
          <JobFilterCard key={key} filterCategory={key} options={options} />
        ))}
      </ul>
    </section>
  );
}
