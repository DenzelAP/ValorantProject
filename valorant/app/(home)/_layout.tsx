import { Tabs } from "expo-router"
import { FontAwesome } from "@expo/vector-icons";

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="screen1"
                options={{
                    // Hide the header for all other routes.
                    headerShown: false,
                    tabBarIcon: ({color, size}) => <FontAwesome name="home" size={size} color={color} />
                  }}
            />
            <Tabs.Screen
                name="screen1"
                options={{
                    // Hide the header for all other routes.
                    headerShown: false,
                    tabBarIcon: ({color, size}) => <FontAwesome name="address-card" size={size} color={color} />
                  }}
            />
        </Tabs>
    )
}

export default Layout;