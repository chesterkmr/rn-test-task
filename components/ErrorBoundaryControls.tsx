import { HomeIcon, RefreshCwIcon } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "./ui/button";
import { Box } from "./ui/box";
import { useRouter } from "expo-router";
import { queryClient } from "@/utils/query-client/query-client";

interface ErrorBoundaryControlsProps {
  onResetError: () => void;
}

export const ErrorBoundaryControls = ({
  onResetError,
}: ErrorBoundaryControlsProps) => {
  const router = useRouter();

  return (
    <Box className="flex flex-col gap-3">
      <Button
        action="primary"
        size="lg"
        onPress={() => {
          onResetError();
          //invalidate all queries
          queryClient.invalidateQueries();
        }}
      >
        <ButtonIcon as={RefreshCwIcon} />
        <ButtonText>Try Again</ButtonText>
      </Button>
      <Button action="secondary" size="lg" onPress={() => router.push("/")}>
        <ButtonIcon as={HomeIcon} />
        <ButtonText>Go to Home</ButtonText>
      </Button>
    </Box>
  );
};
