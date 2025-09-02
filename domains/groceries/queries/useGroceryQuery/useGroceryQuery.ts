import { useQuery } from "@tanstack/react-query";
import { groceriesQueryKeys } from "../..";

export const useGroceryQuery = (id: string) => {
  return useQuery(groceriesQueryKeys.detail(id));
};
