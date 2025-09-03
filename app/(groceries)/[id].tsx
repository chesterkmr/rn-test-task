import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
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
import { ChevronDownIcon } from "@/components/ui/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGroceryQuery } from "@/domains/groceries/queries/useGroceryQuery/useGroceryQuery";
import { Text } from "@/components/ui/text";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useUpdateGroceryMutation } from "@/domains/groceries/mutations/useUpdateGroceryMutation/useUpdateGroceryMutation";
import { queryClient } from "@/utils/query-client/query-client";
import { groceriesQueryKeys } from "@/domains/groceries";
import { CreateGrocerySchema } from "@/domains/groceries/schemas";
import { GroceryStatusEnum } from "@/domains/groceries/enums";

const FormSchema = CreateGrocerySchema.omit({
  id: true,
});

type TFormSchema = z.infer<typeof FormSchema>;

const statusOptions = [
  { value: GroceryStatusEnum.PENDING, label: "Pending" },
  { value: GroceryStatusEnum.BOUGHT, label: "Bought" },
] as const;

export default function GroceryItemScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: grocery, isLoading: isLoadingGrocery } = useGroceryQuery(
    id as string
  );

  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      status: GroceryStatusEnum.PENDING,
    },
  });

  const { reset } = form;

  const { mutate: updateGroceryMutation, isPending: isUpdatingGrocery } =
    useUpdateGroceryMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: groceriesQueryKeys.list().queryKey,
          exact: false,
        });

        router.back();
        reset({});
      },
    });

  useEffect(() => {
    if (grocery) {
      reset(FormSchema.parse(grocery));
    }
  }, [grocery]);

  const onSubmit = form.handleSubmit((data) => {
    updateGroceryMutation({
      id: id as string,
      ...data,
    });
  });

  if (isLoadingGrocery) {
    return (
      <Box className="flex-1 bg-background-0 pt-8 px-6">
        <Box className="items-center mb-8">
          <ActivityIndicator size="large" color="#6366f1" />
          <Text className="text-lg font-medium text-typography-900 mt-4 text-center">
            Loading...
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-background-0 p-6">
      <Box className="gap-6">
        <FormControl isInvalid={!!form.formState.errors.name}>
          <FormControlLabel>
            <FormControlLabelText>Name</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={form.control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Enter grocery name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {form.formState.errors.name && (
            <FormControlError>
              <FormControlErrorText>
                {form.formState.errors.name.message}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <FormControl isInvalid={!!form.formState.errors.quantity}>
          <FormControlLabel>
            <FormControlLabelText>Quantity</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={form.control}
            name="quantity"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Enter quantity"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(parseInt(text) || 0)}
                  value={value.toString()}
                  keyboardType="numeric"
                />
              </Input>
            )}
          />
          {form.formState.errors.quantity && (
            <FormControlError>
              <FormControlErrorText>
                {form.formState.errors.quantity.message}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <FormControl isInvalid={!!form.formState.errors.status}>
          <FormControlLabel>
            <FormControlLabelText>Status</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={form.control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <Select selectedValue={value} onValueChange={onChange}>
                <SelectTrigger>
                  <SelectInput
                    placeholder="Select status"
                    value={
                      statusOptions.find((option) => option.value === value)
                        ?.label || ""
                    }
                  />
                  <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {statusOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        label={option.label}
                        value={option.value}
                      />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            )}
          />
          {form.formState.errors.status && (
            <FormControlError>
              <FormControlErrorText>
                {form.formState.errors.status.message}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <Button onPress={onSubmit} disabled={isUpdatingGrocery}>
          <ButtonText>Update</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
