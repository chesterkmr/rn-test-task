import { Fab, FabIcon } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";

interface GroceriesCreateProps {
  onCreate: () => void;
}

export const GroceriesCreate = ({ onCreate }: GroceriesCreateProps) => {
  return (
    <Fab
      size="md"
      placement="bottom right"
      isHovered={false}
      isDisabled={false}
      isPressed={false}
      onPress={onCreate}
    >
      <FabIcon as={AddIcon} />
    </Fab>
  );
};

GroceriesCreate.displayName = "GroceriesCreate";
