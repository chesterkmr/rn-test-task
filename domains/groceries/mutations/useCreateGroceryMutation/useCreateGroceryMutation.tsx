import { useMutation } from "@tanstack/react-query";
import { createGrocery, TGetGroceriesQueryParams } from "../../fetchers";
import { CommonToast } from "@/components/toasts/CommonToast";
import { useToast } from "@/components/ui/toast";
import { queryClient } from "@/utils/query-client/query-client";
import { groceriesQueryKeys } from "../..";
import { TCreateGrocery } from "../../schemas";

interface UseCreateGroceryMutationProps {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useCreateGroceryMutation = ({
  onSuccess,
  onError,
}: UseCreateGroceryMutationProps) => {
  const toast = useToast();

  return useMutation({
    mutationFn: (grocery: TCreateGrocery) => createGrocery(grocery),
    onError: (error) => {
      toast.show({
        placement: "bottom",
        render: () => (
          <CommonToast
            title="Error"
            description="Error creating grocery"
            variant="error"
          />
        ),
      });
      console.error(error);

      onError?.();
    },
    onSuccess: () => {
      toast.show({
        placement: "bottom",
        render: () => <CommonToast title="Grocery created" variant="success" />,
      });

      queryClient.invalidateQueries({
        // Invalidating all groceries queries despite filters
        queryKey: groceriesQueryKeys.list(
          {} as unknown as TGetGroceriesQueryParams
        ).queryKey,
        exact: false,
      });
      onSuccess?.();
    },
  });
};
