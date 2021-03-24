import { isArray } from "lodash";
import { Order, Query, SortMap } from "../types";

function toQueryString(query: Query) {
  return new URLSearchParams(query).toString();
}

/**
 *
 * @param url a valid url string
 * @param query key-value url query object
 * @returns a valid url string with the parsed query
 */
export default function urlWithQuery(url, query: Query) {
  let queryWithoutEmptyParams = {};
  Object.keys(query).forEach((key) => {
    if (query[key]) {
      queryWithoutEmptyParams[key] = query[key];
    }
  });
  if (Object.keys(queryWithoutEmptyParams).length === 0) {
    return url;
  } else {
    return `${url}?${toQueryString(queryWithoutEmptyParams)}`;
  }
}

export function addSortQuery(
  sortQueryString?: string | string[],
  newEntry?: string,
  order?: Order
) {
  if ((!sortQueryString && !order) || isArray(sortQueryString)) {
    return "";
  }
  const chosenSort = newEntry + ":" + order;
  const chosenSortInverse = newEntry + ":" + toggleOrder(order);
  let newSortQueryString = "";

  if (sortQueryString.search(chosenSort) >= 0) {
    return sortQueryString;
  } else {
    /**
     * for when the opposite e.g. user chose location:asc when location:desc
     * was already there.
     * replace the inverse with the new choice
     */
    if (sortQueryString.search(chosenSortInverse) >= 0) {
      newSortQueryString = sortQueryString.replace(
        chosenSortInverse,
        chosenSort
      );
    } else {
      /**
       * for when new selection wasn't already there
       * fix for excess commas
       */
      if (sortQueryString.length) {
        newSortQueryString = sortQueryString + "," + chosenSort;
      } else {
        newSortQueryString = chosenSort;
      }
    }
  }
  return newSortQueryString;
}

export function removeSortQuery(
  sortQueryString: string | string[],
  sortToRemove: string
) {
  if (isArray(sortQueryString)) {
    return "";
  }

  let substringToRemove = "";

  if (sortQueryString.match(sortToRemove + ",")) {
    substringToRemove = sortToRemove + ",";
  } else if (sortQueryString.match("," + sortToRemove)) {
    substringToRemove = "," + sortToRemove;
  } else {
    substringToRemove = sortToRemove;
  }

  const newSortQueryString = sortQueryString.replace(substringToRemove, "");

  return newSortQueryString;
}

function toggleOrder(order: Order) {
  if (order === "asc") {
    return "desc";
  } else {
    return "asc";
  }
}

/**
 * Turns sort info from a string to key-value pairs in an object
 * @param sortQueryString the sort string in the query object e.g "Location:asc"
 * @returns an object with keys like "Location" and values like "asc" or "desc"
 */
export function getSortMap(sortQueryString: string) {
  let sortMap: SortMap = {};
  try {
    sortQueryString.split(",").forEach((sortSelection) => {
      const keyValueArrr = sortSelection.split(":");
      sortMap[keyValueArrr[0]] = keyValueArrr[1];
    });
  } catch (error) {
    console.log({ error });
    return {};
  }

  return sortMap;
}
