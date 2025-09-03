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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useCreateGroceryMutation } from "@/domains/groceries/mutations/useCreateGroceryMutation/useCreateGroceryMutation";
import { router } from "expo-router";
import z from "zod";
import { randomUUID } from "expo-crypto";
import { CreateGrocerySchema } from "@/domains/groceries/schemas";
import { GroceryStatusEnum } from "@/domains/groceries/enums";

const FormSchema = CreateGrocerySchema.omit({
  id: true,
});

type TFormSchema = z.infer<typeof FormSchema>;

const defaultValues: TFormSchema = {
  name: "",
  quantity: 0,
  status: GroceryStatusEnum.PENDING,
};

export default function CreateGroceryScreen() {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { reset } = form;

  const { mutate: createGroceryMutation, isPending: isCreatingGrocery } =
    useCreateGroceryMutation({
      onSuccess: () => {
        router.back();
        reset({});
      },
    });

  const onSubmit = form.handleSubmit((data) => {
    createGroceryMutation({
      id: randomUUID(),
      ...data,
    });
  });

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

        <Button onPress={onSubmit} disabled={isCreatingGrocery}>
          <ButtonText>Add Grocery</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
