import React, { useState, useCallback } from "react";
import Image from "next/image";
import { debounce } from "lodash";
import urlWithQuery from "utils/client";
import { useRouter } from "next/router";
import Router from "next/router";

export default function SearchInput() {
  const router = useRouter();
  const { query } = router;

  /**
   * https://rajeshnaroth.medium.com/using-throttle-and-debounce-in-a-react-function-component-5489fc3461b3
   */
  const [inputValue, setInputValue] = useState(query.search || "");
  const delayedQuery = useCallback(
    debounce((searchString, query) => {
      Router.replace(urlWithQuery("/jobs", { ...query, search: searchString }));
    }, 400),
    []
  );

  function handleChange(e) {
    setInputValue(e.target.value);
    delayedQuery(e.target.value, query);
  }

  function handleClick() {
    setInputValue("");
    router.replace(urlWithQuery("/jobs", { ...query, search: "" }));
  }

  return (
    <div className="flex flex-none bg-white w-full md:mb-4 border border-gray-200 items-center relative">
      <span className="px-3 pt-1">
        <Image src="/search.png" width="15" height="15" alt="search" />
      </span>
      <input
        type="text"
        value={inputValue}
        className="flex-auto p-2"
        onChange={handleChange}
        placeholder="Search for any job, title, keywords or company"
      />
      {inputValue && (
        <button
          className="text-xs bg-gray-400 font-semibold p-1 mx-2 rounded-sm text-white"
          onClick={handleClick}
        >
          CLEAR
        </button>
      )}
    </div>
  );
}
