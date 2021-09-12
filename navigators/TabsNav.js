import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabIcon from "../components/nav/TabIcon";
import useMe from "../hooks/useMe";
import { Image, View } from "react-native";
import SharedStackNav from "./SharedStackNav";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
    const { data } = useMe();
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
                name="CameraScreen"
                component={View}
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate("Upload");
                        },
                    };
                }}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon iconName={"camera"} color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="MeScreen"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        data?.me?.avatarURL ?
                            <Image
                                source={{ uri: data.me.avatarURL }}
                                style={{ height: 30, width: 30, borderRadius: 15, ...(focused && { borderColor: "white", borderWidth: 1 }) }}
                            />
                            : <TabIcon iconName={"person"} color={color} focused={focused} />
                    ),
                }}>
                {() => <SharedStackNav screenName="Me" />}
            </Tabs.Screen>
        </Tabs.Navigator >
    );
}