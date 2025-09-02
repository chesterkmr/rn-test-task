import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  DEFAULT_GET_GROCERIES_QUERY_PARAMS,
  fetchGroceries,
  fetchGrocery,
} from "./fetchers";

export const groceriesQueryKeys = createQueryKeys("groceries", {
  detail: (id: string) => ({
    queryKey: ["detail", id],
    queryFn: () => fetchGrocery(id),
  }),
  list: (queryParams = DEFAULT_GET_GROCERIES_QUERY_PARAMS) => ({
    // Not using queryParams due to client side filtering
    queryKey: ["list"],
    queryFn: () => fetchGroceries(queryParams),
  }),
  delete: (id: string) => ["delete", id],
});
