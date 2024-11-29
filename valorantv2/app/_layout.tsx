import DataProvider from "@/components/DataProvider";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <DataProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarBackgroundColor: "black",
        }}
      ></Stack>
    </DataProvider>
  );
};

export default Layout;
