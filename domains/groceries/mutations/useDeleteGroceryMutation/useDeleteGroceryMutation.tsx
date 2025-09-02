import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGrocery } from "../../fetchers";
import { groceriesQueryKeys } from "../..";
import { useToast } from "@/components/ui/toast";
import { CommonToast } from "@/components/toasts/CommonToast";

export const useDeleteGroceryMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteGrocery(id),
    onError: () => {
      toast.show({
        placement: "bottom",
        render: () => (
          <CommonToast
            title="Error"
            description="Error deleting grocery"
            variant="error"
          />
        ),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(groceriesQueryKeys.list());

      toast.show({
        placement: "bottom",
        render: () => (
          <CommonToast
            title="Grocery deleted"
            description="Grocery deleted successfully"
            variant="success"
          />
        ),
      });
    },
  });
};
