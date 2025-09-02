import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Slot } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/query-client/query-client";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorBoundaryControls } from "@/components/ErrorBoundaryControls";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  // Muting annoying warnings
  strict: false,
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <ThemeProvider value={DefaultTheme}>
          <ErrorBoundary ControlsComponent={ErrorBoundaryControls}>
            <Slot />
          </ErrorBoundary>
        </ThemeProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
