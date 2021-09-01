import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import TabIcon from "../components/nav/TabIcon";

const Tabs = createBottomTabNavigator();

export default function LoggedOutNav() {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerMode: "screen",
                headerBackTitleVisible: false,
                headerTintColor: "white",
                headerStyle: {
                    borderBottomColor: "rgba(255, 255, 255, 0.3)",
                    shadowColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor: "black",
                },
                tabBarActiveTintColor: "white",
                tabBarStyle: {
                    borderTopColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor: "black",
                },
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"home"} color={color} focused={focused} />
                    ),
                }} />
            <Tabs.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"person"} color={color} focused={focused} />
                ),
            }} />
            <Tabs.Screen name="Search" component={Search} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"search"} color={color} focused={focused} />
                ),
            }} />
        </Tabs.Navigator >
    );
}