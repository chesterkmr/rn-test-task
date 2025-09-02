import { useMemo } from "react";
import { TGroceryItem } from "../../schemas";
import { useGroceries } from "./hooks/useGroceries";
import { FlatList, RefreshControl, ListRenderItem } from "react-native";
import { Box } from "@/components/ui/box";
import { Colors } from "@/constants/Colors";

interface GroceriesListProps {
  children: (grocery: TGroceryItem) => React.ReactElement;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const GroceriesList = ({
  children,
  isRefreshing,
  onRefresh,
}: GroceriesListProps) => {
  const { groceries } = useGroceries();

  const renderer: ListRenderItem<TGroceryItem> = useMemo(
    () =>
      ({ item }) =>
        children(item),
    [children]
  );
  return (
    <FlatList
      data={groceries}
      keyExtractor={(item) => item.id}
      renderItem={renderer}
      contentContainerStyle={{
        paddingBottom: 96,
        paddingTop: 16,
        paddingHorizontal: 16,
      }}
      ItemSeparatorComponent={() => <Box className="h-3" />}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={Colors.light.tint}
          colors={[Colors.light.tint]}
          progressBackgroundColor={Colors.light.background}
        />
      }
    />
  );
};

GroceriesList.displayName = "GroceriesList";
