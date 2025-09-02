import React, { useCallback } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { CheckIcon, Trash2Icon } from "lucide-react-native";
import { GroceryStatusEnum, TGroceryItemStatus } from "../../schemas";
import { Alert, Pressable } from "react-native";
import { QuantityInput } from "@/components/ui/quantity-input";
import { TUpdateGrocery } from "../../fetchers";

interface GroceriesItemProps {
  id: string;
  status: TGroceryItemStatus;
  name: string;
  quantity: number;
  onUpdate: (id: string, data: TUpdateGrocery) => void;
  onDelete?: (id: string) => void;
  onSelect: (id: string) => void;
}

export const GroceriesItem = ({
  id,
  status,
  name,
  quantity,
  onUpdate,
  onDelete,
  onSelect,
}: GroceriesItemProps) => {
  const isBought = status === GroceryStatusEnum.BOUGHT;

  const handleDelete = useCallback(() => {
    Alert.alert(
      "Delete Grocery",
      "Are you sure you want to delete this grocery?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: () => onDelete?.(id) },
      ]
    );
  }, [onDelete, id]);

  const handleQuantityUpdate = useCallback(
    (quantity: number) => {
      onUpdate(id, { quantity, id });
    },
    [onUpdate, id, status, name]
  );

  const handleMarkAsBought = useCallback(() => {
    onUpdate(id, { status: GroceryStatusEnum.BOUGHT, id });
  }, [onUpdate, id]);

  const handleSelect = useCallback(() => {
    onSelect(id);
  }, [onSelect, id]);

  return (
    <Box className="w-full flex-row items-center px-5 py-4 bg-background-0 rounded-2xl border border-border-200 shadow-soft-1 active:scale-[0.98] transition-all duration-200 hover:shadow-soft-2 hover:border-border-300">
      <Box className="flex flex-row items-center flex-1 gap-4">
        <Checkbox value={id} isChecked={isBought} size="lg">
          <CheckboxIndicator className="border-2 border-outline-300 bg-background-0 data-[checked=true]:bg-primary-600 data-[checked=true]:border-primary-600 hover:border-outline-400 hover:data-[checked=true]:bg-primary-700 transition-all duration-200 shadow-hard-1">
            <CheckboxIcon
              as={CheckIcon}
              className="text-typography-0 stroke-2"
            />
          </CheckboxIndicator>
        </Checkbox>
        <Box className="flex-1">
          <Pressable
            onPress={handleSelect}
            className="flex-row items-center gap-2 p-1 -m-1 rounded-lg active:bg-background-100 transition-all duration-200"
          >
            <Text
              className={`text-lg font-semibold leading-tight ${
                isBought
                  ? "text-typography-400 line-through opacity-60"
                  : "text-typography-900"
              } transition-colors duration-200`}
            >
              {name}
            </Text>
            <Text className="text-lg text-typography-500 opacity-60">→</Text>
          </Pressable>
          <Box className="flex-row items-center mt-2 gap-2">
            <Text className="text-sm text-typography-600">Qty:</Text>
            <QuantityInput value={quantity} onChange={handleQuantityUpdate} />
            <Text className="text-xs text-typography-500 italic">
              {quantity === 1 ? "item" : "items"}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box className="flex flex-row flex-nowrap gap-2">
        {!isBought && (
          <Pressable
            onPress={handleMarkAsBought}
            className="p-2 rounded-xl bg-secondary-50 border border-outline-200 shadow-soft-1 active:scale-95 transition-all duration-200 hover:bg-secondary-100 hover:border-outline-300"
          >
            <CheckIcon size={18} className="text-typography-600" />
          </Pressable>
        )}
        <Pressable
          onPress={handleDelete}
          className="p-2 rounded-xl bg-secondary-50 border border-outline-200 shadow-soft-1 active:scale-95 transition-all duration-200 hover:bg-secondary-100 hover:border-outline-300"
        >
          <Trash2Icon size={18} className="text-typography-600" />
        </Pressable>
      </Box>
    </Box>
  );
};

GroceriesItem.displayName = "GroceriesItem";
