import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export default function GroceriesLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        headerTintColor: Colors[colorScheme ?? "light"].text,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Groceries List",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: "Create Grocery",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Grocery Item",
        }}
      />
    </Stack>
  );
}
