import { getFilterCategories, performFilter, search } from "../../utils/api";
import hospitals from "../../data/jobs.json";

test("should return matching hospitals", () => {
  const expected = [
    {
      total_jobs_in_hospital: 8,
      name: "Mammoth Hospital",
      job_title: "LPN Charge Nurse",
      items: [
        {
          required_skills: [
            "Temperature Recording: Disposable Chemical Thermometer Oral",
            "Catheter Bag – Emptying (Urinary)",
            "Care of a Patient During a Seizure",
            "Bed Bath",
            "Administration of an Enema",
          ],
          county: "Mono",
          zip: 93546,
          location: "37.64,-118.96",
          nurse_patient_ratio: "1:2",
          job_id: 3860,
          type: "General Acute Care",
          work_schedule: "Night shift",
          hospital_id: 757,
          name: "Mammoth Hospital",
          state: "CA",
          created: "2020-10-24T20:04:15.502846",
          required_credentials: [
            "DNP - Doctor of Nursing Practice",
            "CNM - Certified Nurse-Midwife",
          ],
          department: [
            "Medicine",
            "Anesthesiology & Perioperative Medicine",
            "Head and Neck Surgery",
            "Neurosurgery",
            "Pathology & Laboratory Medicine",
          ],
          address: "85 Sierra Park Road",
          experience: "Internship",
          city: "Mammoth Lakes, CA",
          description:
            "Within the context of a client and family centred model of care, and in accordance with the Mission, Vision, Values and strategic directions of Providence Health Care, the person promotes a safe, respectful, and civil working environment for patients, residents, families, visitors and staff",
          job_title: "LPN Charge Nurse",
          hours: [10],
          salary_range: [22.22, 33.32],
          job_type: "Part-time",
        },
      ],
    },
  ];

  expect(search(hospitals, "lpn charge nurse")).toEqual(expected);
});

test("should filter hospitals based on multiple criteria", () => {
  const filters = {
    job_type: "Per-Diem",
    work_schedule: "Night shift",
    experience: "Senior",
    department: "Anesthesiology & Perioperative Medicine",
  };

  const expected = [
    {
      total_jobs_in_hospital: 6,
      name: "St. James Behavioral Health Hospital",
      job_title: "Public Health Nurse",
      items: [
        {
          required_skills: [
            "Use of Protective Splints (Child)",
            "Pain Assessment and PCA",
            "Patient Education: Intermittent Self-catheterisation",
            "Oxygen Therapy: Applying Nasal Mask",
            "Automated External Defibrillator (AED)",
          ],
          county: "Ascension",
          zip: 70737,
          location: "30.2,-90.95",
          nurse_patient_ratio: "1:1",
          job_id: 3980,
          type: "Psychiatric",
          work_schedule: "Night shift",
          hospital_id: 777,
          name: "St. James Behavioral Health Hospital",
          state: "LA",
          created: "2020-10-20T20:04:15.564383",
          required_credentials: [
            "DNP - Doctor of Nursing Practice",
            "LPN - Licensed Practical Nurse",
          ],
          department: [
            "Radiation Oncology",
            "Obstetrics and Gynecology",
            "Pediatrics",
            "Emergency Medicine",
            "Anesthesiology & Perioperative Medicine",
          ],
          address: "3136 S St. Landry Road",
          experience: "Senior",
          city: "Gonzales, LA",
          description:
            "Within the context of a client and family centred model of care, and in accordance with the Mission, Vision, Values and strategic directions of Providence Health Care, the person promotes a safe, respectful, and civil working environment for patients, residents, families, visitors and staff",
          job_title: "Telemetry Nurse",
          hours: [12],
          salary_range: [32.74, 52.43],
          job_type: "Per-Diem",
        },
      ],
    },
  ];

  expect(performFilter(hospitals, filters)).toEqual(expected);
});

test("should extract filters from query object", () => {
  const query = {
    job_type: "Per-Diem",
    work_schedule: "Night shift",
    experience: "Senior",
    department: "Anesthesiology & Perioperative Medicine",
    sort: "Location:asc",
    search: "tele",
  };

  const expected = {
    job_type: "Per-Diem",
    work_schedule: "Night shift",
    experience: "Senior",
    department: "Anesthesiology & Perioperative Medicine",
  };

  expect(getFilterCategories(query)).toEqual(expected);
});
