import { createContext } from "react";
import {
  DEFAULT_GET_GROCERIES_QUERY_PARAMS,
  TGetGroceriesQueryParams,
} from "../../../fetchers";
import { TGroceryItem } from "../../../schemas";

export type TGroceriesContext = {
  groceries: TGroceryItem[];
  filters: TGetGroceriesQueryParams;
};

export const GroceriesContext = createContext<TGroceriesContext>({
  groceries: [],
  filters: DEFAULT_GET_GROCERIES_QUERY_PARAMS,
});
