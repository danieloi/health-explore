import React from "react";
import urlWithQuery from "utils/client";
import SidePanelFilterList from "components/SidePanelFilterOptionsList";
import { Provider } from "contexts/Context";
import JobsList from "components/JobsList";
import SearchInput from "components/SearchInput";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function Jobs() {
  const { query } = useRouter();

  const { data: hospitals } = useSWR(urlWithQuery("/api/jobs", query));

  return (
    <Provider value={{ hospitals }}>
      <div className="sm:p-4">
        <SearchInput />
        <div className="flex md:space-x-3 flex-wrap sm:flex-nowrap">
          <SidePanelFilterList />
          <JobsList />
        </div>
      </div>
    </Provider>
  );
}
