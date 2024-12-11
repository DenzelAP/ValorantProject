import DataProvider from "@/components/DataProvider";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [loaded, error] = useFonts({
    "valorant-font": require("@/assets/fonts/valorant-font.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

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
