import { useMutation } from "@tanstack/react-query";
import {
  DEFAULT_GET_GROCERIES_QUERY_PARAMS,
  TGetGroceriesQueryParams,
  updateGrocery,
} from "../../fetchers";
import { queryClient } from "@/utils/query-client/query-client";
import { groceriesQueryKeys } from "../..";
import { useToast } from "@/components/ui/toast";
import { CommonToast } from "@/components/toasts/CommonToast";
import { TGetGroceriesResponse, TUpdateGrocery } from "../../schemas";

interface UseUpdateGroceryMutationProps {
  queryParams?: TGetGroceriesQueryParams;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateGroceryMutation = ({
  onSuccess,
  onError,
  queryParams = DEFAULT_GET_GROCERIES_QUERY_PARAMS,
}: UseUpdateGroceryMutationProps) => {
  const toast = useToast();

  return useMutation({
    mutationFn: (grocery: TUpdateGrocery) => updateGrocery(grocery.id, grocery),
    onMutate: (grocery: TUpdateGrocery) => {
      const previousData =
        (queryClient.getQueryData(
          groceriesQueryKeys.list(queryParams).queryKey
        ) as TGetGroceriesResponse) || [];

      const updatedData = previousData.map((oldGrocery) =>
        oldGrocery.id === grocery.id
          ? {
              ...oldGrocery,
              ...grocery,
            }
          : oldGrocery
      );

      queryClient.setQueryData(
        groceriesQueryKeys.list(queryParams).queryKey,
        updatedData
      );

      return { previousData };
    },
    onError: (error, __, context) => {
      if (!context?.previousData) {
        console.warn("No previous data found, cannot rollback.");
        return;
      }

      queryClient.setQueryData(
        groceriesQueryKeys.list(queryParams).queryKey,
        context?.previousData
      );

      onError?.(error);
      console.error(error);
    },
    onSuccess: () => {
      toast.show({
        placement: "top",
        render: () => <CommonToast title="Grocery updated" variant="success" />,
      });

      onSuccess?.();
    },
  });
};
