import { TGroceryItem } from "../../schemas";
import { GroceriesItem } from "./GroceriesItem";
import React, { useMemo } from "react";
import {
  GroceriesContext,
  TGroceriesContext,
} from "./context/GroceriesContext";
import { TGetGroceriesQueryParams } from "../../fetchers";
import { GroceriesFilters } from "./Groceries.Filters";
import { GroceriesSummary } from "./Groceries.Summary";
import { GroceriesList } from "./Groceries.List";
import { GroceriesCreate } from "./Groceries.Create";
import { GroceriesEmptyList } from "./Groceries.EmptyList";

interface GroceriesProps {
  groceries: TGroceryItem[];
  filters: TGetGroceriesQueryParams;
  isFetching: boolean;
  children: React.ReactNode;
}

export const Groceries = ({
  groceries,
  filters,
  isFetching,
  children,
}: GroceriesProps) => {
  const context: TGroceriesContext = useMemo(
    () => ({
      groceries,
      filters,
      isFetching,
    }),
    [groceries, filters, isFetching]
  );

  return (
    <GroceriesContext.Provider value={context}>
      {children}
    </GroceriesContext.Provider>
  );
};

Groceries.displayName = "Groceries";

Groceries.Summary = GroceriesSummary;
Groceries.Item = GroceriesItem;
Groceries.Filters = GroceriesFilters;
Groceries.List = GroceriesList;
Groceries.Create = GroceriesCreate;
Groceries.EmptyList = GroceriesEmptyList;
