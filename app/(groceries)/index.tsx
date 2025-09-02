import { Box } from "@/components/ui/box";
import { useGroceriesQuery } from "@/domains/groceries/queries/useGroceriesQuery/useGroceriesQuery";
import { Groceries } from "@/domains/groceries/components/Groceries/Groceries";
import { useDeleteGroceryMutation } from "@/domains/groceries/mutations/useDeleteGroceryMutation/useDeleteGroceryMutation";
import { useGroceriesFilters } from "@/domains/groceries/hooks/useGroceriesFilters/useGroceriesFilters";
import { useRouter } from "expo-router";
import { TGroceryItem } from "@/domains/groceries/schemas";
import { useCallback, useMemo } from "react";
import { useUpdateGroceryMutation } from "@/domains/groceries/mutations/useUpdateGroceryMutation/useUpdateGroceryMutation";
import { SafeAreaView } from "react-native";

export default function GroceriesScreen() {
  const router = useRouter();

  const { filters, defaultFilters, updateFilters } = useGroceriesFilters();
  const { data = [], isFetching, refetch } = useGroceriesQuery(filters);
  const { mutate: deleteGrocery } = useDeleteGroceryMutation();
  const { mutate: updateGrocery } = useUpdateGroceryMutation({
    queryParams: filters,
  });

  const redirectToGroceryCreation = useCallback(() => {
    router.push("/(groceries)/create");
  }, [router]);

  const rendererFn = useMemo(() => {
    return (grocery: TGroceryItem) => {
      return (
        <Groceries.Item
          key={grocery.id}
          id={grocery.id}
          status={grocery.status}
          name={grocery.name}
          quantity={grocery.quantity}
          onDelete={() => deleteGrocery(grocery.id)}
          onUpdate={(_, data) => updateGrocery({ ...data })}
          onSelect={() => router.push(`/(groceries)/${grocery.id}`)}
        />
      );
    };
  }, [deleteGrocery, router]);

  const isEmpty = data?.length === 0 && !isFetching;

  return (
    <SafeAreaView className="flex-1">
      <Groceries groceries={data} filters={filters} isFetching={isFetching}>
        <Box className="flex flex-row flex-nowrap justify-between items-center bg-background-0 border-b border-border-200 px-6 py-4 w-full">
          <Groceries.Summary title="Groceries List" />
          <Groceries.Filters
            defaultFilters={defaultFilters}
            onFilterChange={updateFilters}
          />
        </Box>
        <Box className="w-full">
          <Groceries.List isRefreshing={isFetching} onRefresh={refetch}>
            {rendererFn}
          </Groceries.List>
        </Box>
      </Groceries>
      {isEmpty ? (
        <Groceries.EmptyList
          title="No groceries yet"
          description="Start building your grocery list by adding items you need to buy."
          callToActionText="Add your first item"
          onAddGrocery={redirectToGroceryCreation}
        />
      ) : (
        <Groceries.Create onCreate={redirectToGroceryCreation} />
      )}
    </SafeAreaView>
  );
}
