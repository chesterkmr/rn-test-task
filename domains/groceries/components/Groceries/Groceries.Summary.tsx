import { Text } from "@/components/Themed";
import { Box } from "@/components/ui/box";
import { useGroceries } from "./hooks/useGroceries";
import { useMemo } from "react";
import { GroceryStatusEnum } from "../../enums";

interface GroceriesSummaryProps {
  className?: string;
  title: string;
}

export const GroceriesSummary = ({
  className,
  title,
}: GroceriesSummaryProps) => {
  const { groceries } = useGroceries();

  const pendingGroceries = useMemo(
    () =>
      groceries.filter(
        (grocery) => grocery.status === GroceryStatusEnum.PENDING
      ),
    [groceries]
  );

  return (
    <Box className={className}>
      <Text className="text-lg font-bold text-typography-900 mb-1">
        {title}
      </Text>
      <Text className="text-xs text-typography-600">
        {groceries.length} {groceries.length === 1 ? "item" : "items"} (
        {pendingGroceries.length} pending)
      </Text>
    </Box>
  );
};

GroceriesSummary.displayName = "GroceriesSummary";
