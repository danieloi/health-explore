import React from "react";
import HospitalList from "./HospitalList";
import JobsListHeader from "./JobsListHeader";

export default function JobsList() {
  return (
    <section className="bg-white p-4 border border-gray-200  flex-auto">
      <JobsListHeader />
      <HospitalList />
    </section>
  );
}
