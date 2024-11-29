import { Tabs } from "expo-router"
import { FontAwesome } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="characters"
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => <Entypo name="man" size={size} color={color} />,
                    tabBarActiveTintColor: "#FF4D4D",
                    title: "CHARACTERS", 
                    tabBarActiveBackgroundColor: "black",
                    tabBarInactiveBackgroundColor: "black"
                  }}
            />
            <Tabs.Screen
                name="weapons"
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="chemical-weapon" size={size} color={color} />,
                    tabBarActiveTintColor: "#FF4D4D",
                    title: "WEAPONS",
                    tabBarActiveBackgroundColor: "black",
                    tabBarInactiveBackgroundColor: "black"
                  }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => <FontAwesome name="home" size={size} color={color} />,
                    tabBarActiveTintColor: "#FF4D4D",
                    title: "HOME",
                    tabBarActiveBackgroundColor: "black",
                    tabBarInactiveBackgroundColor: "black",
                  }}
            />
        </Tabs>
    )
}

export default Layout;