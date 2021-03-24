import { Context } from "contexts/Context";
import { isEmpty, isString, map, orderBy } from "lodash";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Hospital, Order, SortMap } from "types";
import { getSortMap } from "utils/client";
import HospitalItem from "./HospitalItem";

export default function HospitalList() {
  const { hospitals } = useContext(Context);
  const router = useRouter();

  const { query } = router;
  let sortMap: SortMap = {};
  if (!isEmpty(query.sort) && isString(query.sort)) {
    sortMap = getSortMap(query.sort);
  }

  /**
   * sort hospitals by location
   */
  const sortedHospitals = sortHospitalsByLocation(hospitals, sortMap.Location);

  return (
    <ul>
      {map(sortedHospitals, (hospital) => (
        <HospitalItem
          hospital={hospital}
          sortMap={sortMap}
          key={hospital.name}
        />
      ))}
    </ul>
  );
}

function sortHospitalsByLocation(hospitals: Hospital[], sortOrder?: Order) {
  if (!sortOrder) {
    return hospitals;
  }

  return orderBy(hospitals, ["name"], [sortOrder]);
}
