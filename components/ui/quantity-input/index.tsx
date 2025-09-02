import { MinusIcon, PlusIcon } from "lucide-react-native";
import { Box } from "../box";
import { Pressable } from "../pressable";
import { Input, InputField } from "../input";
import { useCallback, useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
}

const sanitizeStringToNumber = (value: string | number) => {
  value = parseInt(String(value));

  return isNaN(value) ? "" : value;
};
const safeDecrement = (value: number) => (value === 0 ? value : value - 1);

export const QuantityInput = ({ value, onChange }: QuantityInputProps) => {
  const [internalValue, setInternalValue] = useState<string | number>(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleDecrement = useCallback(() => {
    const nextValue = safeDecrement(+internalValue);

    if (internalValue !== nextValue) {
      onChange(nextValue);
    }
  }, [onChange, internalValue]);
  const handleIncrement = useCallback(
    () => onChange(+internalValue + 1),
    [onChange, internalValue]
  );

  const handleChange = useCallback((quantity: string) => {
    const isNanOrEmptyString = sanitizeStringToNumber(quantity) === "";
    setInternalValue(isNanOrEmptyString ? "" : +quantity);
  }, []);

  const handleBlur = useCallback(() => {
    onChange(+internalValue);
  }, [internalValue, onChange]);

  return (
    <Box className="flex-row items-center bg-background-50 border border-outline-300 rounded-lg h-8">
      <Pressable
        disabled={internalValue === 0}
        onPress={handleDecrement}
        className={`p-1.5 h-8 w-8 flex items-center justify-center rounded-l-lg active:scale-95 transition-all duration-200 active:bg-outline-100 ${
          internalValue === 0 ? "opacity-50" : ""
        }`}
      >
        <MinusIcon
          size={14}
          className={`${
            internalValue === 0 ? "text-typography-400" : "text-typography-700"
          }`}
        />
      </Pressable>
      <Box className="px-2 h-8 w-12 flex items-center justify-center border-l border-r border-t border-b border-outline-300 bg-background-0">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Input className="border-0 bg-transparent p-0 m-0 h-auto w-full">
            <InputField
              keyboardType="numeric"
              value={internalValue.toString()}
              onBlur={handleBlur}
              onChangeText={handleChange}
              textAlign="center"
              className="text-sm font-semibold text-typography-800 text-center h-5 p-0 m-0"
              style={{ textAlignVertical: "center" }}
            />
          </Input>
        </TouchableWithoutFeedback>
      </Box>
      <Pressable
        onPress={handleIncrement}
        className="p-1.5 h-8 w-8 flex items-center justify-center rounded-r-lg active:scale-95 transition-all duration-200 active:bg-outline-100"
      >
        <PlusIcon size={14} className="text-typography-700" />
      </Pressable>
    </Box>
  );
};
