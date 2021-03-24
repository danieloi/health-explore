import { filter, forEach, isEmpty, map, reduce } from "lodash";
import { NextApiRequest } from "next";
import { Hospital, Job, Query, SelectedFiltersMap } from "types";

export function getData(req: NextApiRequest, hospitals: Hospital[]) {
  const { query }: { query: Query } = req;

  if (!Object.keys(query).length) {
    return hospitals;
  }

  const filterCategories = getFilterCategories(query);

  let filteredHospitals = [...hospitals];

  if (Object.keys(filterCategories).length) {
    filteredHospitals = performFilter(hospitals, filterCategories);
  }

  let hits = [...filteredHospitals];

  if (query.search) {
    hits = search(filteredHospitals, query.search);
  }

  return hits;
}

export function search(hospitals: Hospital[], searchString: string) {
  if (!searchString) return hospitals;

  const response = map(hospitals, (hospital) => ({
    ...hospital,
    items: filterBySearchString(hospital.items, searchString),
  }));

  return hospitalsWithoutEmptyJobs(response);
}

function filterBySearchString(jobs: Job[], searchString: string) {
  const key = searchString.toLowerCase();

  return filter(jobs, (job) => {
    if (job.work_schedule.toLowerCase().includes(key)) {
      return true;
    }
    if (job.city.toLowerCase().includes(key)) {
      return true;
    }
    if (job.name.toLowerCase().includes(key)) {
      return true;
    }
    if (job.job_type.toLowerCase().includes(key)) {
      return true;
    }
    if (job.job_title.toLowerCase().includes(key)) {
      return true;
    }
    if (job.department.join(" ").toLowerCase().includes(key)) {
      return true;
    }
    return false;
  });
}
/**
 *
 * @param query query object from string
 * @returns an object with just the chosen filters
 */
export function getFilterCategories(query: Query) {
  const filterCategories: SelectedFiltersMap = {};

  forEach(query, (value, type) => {
    if (
      ["job_type", "department", "work_schedule", "experience"].includes(type)
    ) {
      filterCategories[type] = value;
    }
  });

  return filterCategories;
}

export function performFilter(
  hospitals: Hospital[],
  filters: SelectedFiltersMap
) {
  const res = map(hospitals, (hospital) => ({
    ...hospital,
    items: applyFilters(hospital.items, filters),
  }));

  return hospitalsWithoutEmptyJobs(res);
}

function applyFilters(jobs: Job[], filters: SelectedFiltersMap) {
  return reduce(
    jobs,
    (acc, job) => {
      /**
       * only add the job to the accumulator if
       * it passess all filters
       */
      if (passesAllFilters(job, filters)) {
        return [...acc, job];
      }

      return acc;
    },
    []
  );
}

function passesAllFilters(job: Job, filters: SelectedFiltersMap) {
  /**
   * changes to false if one criteria fails
   */
  let passes = true;
  forEach(filters, (value, key) => {
    if (key === "department" ? !job[key].includes(value) : job[key] !== value) {
      passes = false;
      /**
       * break out of forEach
       */
      return false;
    }
  });

  return passes;
}

function hospitalsWithoutEmptyJobs(hospitals: Hospital[]) {
  return filter(hospitals, ({ items }) => !isEmpty(items));
}
