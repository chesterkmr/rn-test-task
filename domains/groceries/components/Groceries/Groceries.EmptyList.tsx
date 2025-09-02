import { Text } from "@/components/Themed";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import classnames from "classnames";

interface GroceriesEmptyListProps {
  title: string;
  description: string;
  callToActionText: string;
  onAddGrocery: () => void;

  className?: string;
}

export const GroceriesEmptyList = ({
  title,
  description,
  callToActionText,
  className,
  onAddGrocery,
}: GroceriesEmptyListProps) => {
  return (
    <Box
      className={classnames(
        "absolute inset-0 flex-1 justify-center items-center px-8",
        className
      )}
    >
      <Box className="items-center max-w-sm">
        <Box className="w-24 h-24 bg-primary-100 rounded-full items-center justify-center mb-6">
          <Text className="text-4xl">🛒</Text>
        </Box>
        <Text className="text-xl font-bold text-typography-800 text-center mb-3">
          {title}
        </Text>
        <Text className="text-base text-typography-600 text-center mb-8 leading-6">
          {description}
        </Text>
        <Button
          onPress={onAddGrocery}
          variant="primary"
          size="lg"
          className="px-8"
        >
          <ButtonText className="font-semibold text-base text-typography-0">
            {callToActionText}
          </ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

GroceriesEmptyList.displayName = "GroceriesEmptyList";
