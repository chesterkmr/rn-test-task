import React, { useCallback, useState } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { Input, InputField } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer";
import { ListFilterIcon, ChevronDownIcon } from "lucide-react-native";
import { TGetGroceriesQueryParams } from "../../fetchers";
import { GroceryStatusEnum, TGroceryItemStatus } from "../../schemas";
import { Button, ButtonText } from "@/components/ui/button";

interface GroceriesFilterProps {
  onFilterChange: (filter: TGetGroceriesQueryParams) => void;
  filters: TGetGroceriesQueryParams;
  defaultFilters: TGetGroceriesQueryParams;
}

const statusOptions = [
  { value: "ALL", label: "All" },
  { value: GroceryStatusEnum.PENDING, label: "Pending" },
  { value: GroceryStatusEnum.BOUGHT, label: "Bought" },
] as const;

export const GroceriesFilter = ({
  onFilterChange,
  filters,
  defaultFilters,
}: GroceriesFilterProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [internalFilters, setInternalFilters] =
    useState<TGetGroceriesQueryParams>(filters);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev);
  }, []);

  const handleApplyFilter = useCallback(() => {
    onFilterChange(internalFilters);
    setIsDrawerOpen(false);
  }, [internalFilters, onFilterChange]);

  const resetFilters = useCallback(() => {
    setInternalFilters(defaultFilters);
    onFilterChange(defaultFilters);
    setIsDrawerOpen(false);
  }, [defaultFilters, onFilterChange]);

  const handleStatusSelect = useCallback((status: string) => {
    setInternalFilters((prev) => ({
      ...prev,
      status: status as TGroceryItemStatus,
    }));
  }, []);

  const getSelectedStatusLabel = () => {
    return (
      statusOptions.find((option) => option.value === internalFilters.status)
        ?.label || "All"
    );
  };

  return (
    <>
      <Pressable
        onPress={toggleDrawer}
        className="flex-row items-center justify-center w-12 h-12 bg-white rounded-2xl border border-border-100 active:scale-95 transition-all duration-150"
      >
        <ListFilterIcon size={20} className="text-typography-600" />
      </Pressable>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        size="lg"
        anchor="top"
        className="flex justify-center items-center"
      >
        <DrawerBackdrop />
        <DrawerContent className="max-w-md mx-auto rounded-t-3xl border-0 shadow-2xl shadow-black/10">
          <DrawerBody className="px-8 py-8">
            <Box className="gap-8 flex flex-col justify-center pt-8">
              <Box>
                <Text className="text-base font-semibold text-typography-800 mb-4">
                  Search
                </Text>
                <Input className="border-0 rounded-2xl bg-background-50 shadow-sm">
                  <InputField
                    value={internalFilters.query}
                    onChangeText={(query) =>
                      setInternalFilters((prev) => ({ ...prev, query }))
                    }
                    placeholder="Type grocery name..."
                    className="text-typography-800 text-base"
                  />
                </Input>
              </Box>

              <Box>
                <Text className="text-base font-semibold text-typography-800 mb-4">
                  Status
                </Text>
                <Select
                  selectedValue={internalFilters.status}
                  onValueChange={handleStatusSelect}
                >
                  <SelectTrigger
                    variant="outline"
                    size="md"
                    className="bg-background-50 border-0 rounded-2xl shadow-sm"
                  >
                    <SelectInput
                      placeholder="Select status"
                      value={getSelectedStatusLabel()}
                      className="text-base font-medium"
                    />
                    <SelectIcon className="mr-4" as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent className="rounded-2xl border-0 shadow-2xl">
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {statusOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          label={option.label}
                          value={option.value}
                          className="py-4 px-5 rounded-xl mx-2"
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </Box>
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Box className="flex flex-row gap-4">
              <Button
                onPress={resetFilters}
                variant="outline"
                className="flex-1"
              >
                <ButtonText className="text-typography-600 font-semibold text-center text-base">
                  Clear
                </ButtonText>
              </Button>
              <Button
                onPress={handleApplyFilter}
                variant="primary"
                className="flex-1"
              >
                <ButtonText className="text-typography-0 font-semibold text-center text-base">
                  Apply
                </ButtonText>
              </Button>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

GroceriesFilter.displayName = "GroceriesFilter";
