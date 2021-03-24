export type Query = {
  /**
   * filter type
   */
  job_type?: string;
  /**
   * filter type
   */
  department?: string;
  /**
   * filter type
   */
  work_schedule?: string;
  /**
   * filter type
   */
  experience?: string;
  /**
   * sort details
   * a string that's converted to a
   * map in different components
   */
  sort?: string;
  /**
   * the string in the search input field
   */
  search?: string;
};

export type Hospital = {
  total_jobs_in_hospital: number;
  name: string;
  job_title: string;
  items?: Job[] | null;
};

export type Job = {
  required_skills?: string[] | null;
  county: string;
  zip: number;
  location: string;
  nurse_patient_ratio: string;
  job_id: number;
  type: string;
  work_schedule: string;
  hospital_id: number;
  name: string;
  state: string;
  created: string;
  required_credentials?: string[] | null;
  department?: string[] | null;
  address: string;
  experience: string;
  city: string;
  description: string;
  job_title: string;
  hours?: number[] | null;
  salary_range?: number[] | null;
  job_type: string;
};

export type FilterCategory =
  | "job_type"
  | "work_schedule"
  | "experience"
  | "department";

export type Filters = {} | Record<FilterCategory, Filter[]>;

export type Filter = {
  key: string;
  doc_count: number;
};

export type Order = "asc" | "desc";

export type SortOptions =
  | "Location"
  | "Role"
  | "Department"
  | "Education"
  | "Experience";

export type SortMap = Partial<Record<SortOptions, Order>>;

/**
 * used in jobs api
 */
export type SelectedFiltersMap = Partial<Record<FilterCategory, string>>;
