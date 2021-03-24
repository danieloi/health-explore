import React from "react";
import { useRouter } from "next/router";
import urlWithQuery from "utils/client";
import Link from "next/link";
import { dropRight } from "lodash";
import Modal from "react-modal";
import useToggle from "hooks/useToggle";

Modal.setAppElement("#__next");

type Props = {
  filterCategory: string;
  options: Array<{
    key: string;
    doc_count: number;
  }>;
};

export default function JobFilterCard({ filterCategory, options }: Props) {
  const router = useRouter();

  const { query } = router;

  /**
   *  TODO: handle case where chosen filter isn't in first ten items
   *
   */
  let firstTenItems = options;

  if (options.length > 10) {
    firstTenItems = dropRight(options, options.length - 10);
  }

  const { state: isDialogOpen, toggleState: toggleIsDialogOpen } = useToggle();

  return (
    <>
      <li className="w-full bg-white mb-4 p-4 border border-gray-200 lg:w-96">
        <h4 className="pb-1 px-1 uppercase font-bold">
          {filterCategory.replace("_", " ")}
        </h4>
        <ul className="pl-0">
          {firstTenItems.map((option) => {
            return (
              <ToggleLink
                filterCategory={filterCategory}
                query={query}
                option={option}
                key={option.key}
              />
            );
          })}
        </ul>
        {options.length > 10 && (
          <button onClick={toggleIsDialogOpen} className="text-blue-500 p-1">
            Show more
          </button>
        )}
      </li>
      {options.length > 10 && (
        <Dialog
          isOpen={isDialogOpen}
          toggleIsOpen={toggleIsDialogOpen}
          filterCategory={filterCategory}
          options={options}
          query={query}
        />
      )}
    </>
  );
}

/**
 * a link that's activated when the route query
 * matches where it goes
 */
function ToggleLink({ query, filterCategory, basePath = "/jobs", option }) {
  const isSelected = query[filterCategory] === option.key;

  const style = isSelected ? "bg-blue-200" : " ";

  return (
    <Link
      href={urlWithQuery(basePath, {
        ...query,
        [filterCategory]: isSelected ? false : option.key,
      })}
    >
      <li key={option.key} className={style}>
        <button className="text-left p-1 w-full">
          <span>{option.key}</span>
          <span className="text-gray-400 p-2">{option.doc_count}</span>
        </button>
      </li>
    </Link>
  );
}

function Dialog({ isOpen, filterCategory, toggleIsOpen, options, query }) {
  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="flex flex-auto justify-center items-center fixed inset-0 bg-gray-600 bg-opacity-50"
      className="bg-transparent bg-white max-w-5xl border border-gray-200 rounded-lg "
    >
      <div className="flex justify-between p-4 border-b border-gray-300 items-center">
        <h4 className=" text-2xl font-bold ">
          {filterCategory.replace("_", " ")}
        </h4>
        <button className="text-xl font-bold p-1" onClick={toggleIsOpen}>
          X
        </button>
      </div>
      <ul className="p-4 flex flex-row flex-wrap space-y-4 spacce-x-4 items-center">
        {options.map((option) => (
          <ToggleLink
            filterCategory={filterCategory}
            query={query}
            option={option}
            key={option.key}
          />
        ))}
      </ul>
    </Modal>
  );
}
