import { useQuery } from "@tanstack/react-query";
import { groceriesQueryKeys } from "../../index";
import { TGetGroceriesQueryParams } from "../../fetchers";
import { useMemo } from "react";

export const useGroceriesQuery = (queryParams: TGetGroceriesQueryParams) => {
  const query = useQuery(groceriesQueryKeys.list(queryParams));

  const filteredData = useMemo(() => {
    if (Object.values(queryParams).every((value) => value === undefined)) {
      return query.data;
    }

    return query.data?.filter((grocery) => {
      const matches = [
        grocery.name
          .toLowerCase()
          .includes(queryParams.query?.toLowerCase() || ""),
        queryParams.status === "ALL" || queryParams.status === grocery.status,
      ];

      return matches.every((match) => match);
    });
  }, [query.data, queryParams]);

  return {
    ...query,
    data: filteredData,
  };
};
