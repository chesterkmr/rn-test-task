import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { DEFAULT_GET_GROCERIES_QUERY_PARAMS } from "../../fetchers";
import { GetGroceriesQueryParamsSchema } from "../../schemas";

interface GroceriesFilters {
  query?: string;
}

const DEFAULT_FILTERS = DEFAULT_GET_GROCERIES_QUERY_PARAMS;

export const useGroceriesFilters = () => {
  const router = useRouter();
  const searchParams = useLocalSearchParams();

  const updateFilters = useCallback(
    (filters: GroceriesFilters) => {
      try {
        const validatedFilters = GetGroceriesQueryParamsSchema.parse(filters);
        router.setParams(validatedFilters);
      } catch (error) {
        console.error("Failed to update filters", error);
      }
    },
    [router]
  );

  const filters = useMemo(() => {
    try {
      return GetGroceriesQueryParamsSchema.parse(searchParams);
    } catch (error) {
      console.error(
        "Failed to parse filters, default filters will be used",
        error
      );
      return DEFAULT_FILTERS;
    }
  }, [searchParams]);

  return {
    filters,
    defaultFilters: DEFAULT_FILTERS,
    updateFilters,
  };
};
