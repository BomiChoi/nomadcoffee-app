import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import LogIn from "../screens/LogIn";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "white",
                tabBarShowLabel: false,
                tabBarStyle: [
                    {
                        borderTopColor: "rgba(255, 255, 255, 0.3)",
                        backgroundColor: "black",
                    },
                    null
                ]
            }}
        >
            <Tabs.Screen
                name="HomeScreen"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"home"} color={color} focused={focused} />
                    ),
                }}>
                {() => <SharedStackNav screenName="Home" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="SearchScreen"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"search"} color={color} focused={focused} />
                    ),
                }} >
                {() => <SharedStackNav screenName="Search" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="LoginScreen"
                component={LogIn}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"person"} color={color} focused={focused} />
                    ),
                }}
            />
        </Tabs.Navigator >
    );
}