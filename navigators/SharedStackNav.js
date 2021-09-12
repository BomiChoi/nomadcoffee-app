import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShopScreen from "../screens/ShopScreen";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Me from "../screens/Me";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";
import Profile from "../screens/Profile";

import { Image } from "react-native";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerMode: "screen",
                headerBackTitleVisible: false,
                headerTintColor: "white",
                headerStyle: {
                    borderBottomColor: "rgba(255, 255, 255, 0.3)",
                    shadowColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor: "black",
                },
            }}
        >
            {screenName === "Home" ? (
                <Stack.Screen
                    name={"Home"}
                    component={Home}
                    options={{
                        headerTitle: () => (
                            <Image
                                style={{
                                    width: 200,
                                    height: 80,
                                }}
                                resizeMode="contain"
                                source={require("../assets/logo.png")}
                            />
                        ),
                    }}
                />
            ) : null}
            {screenName === "Search" ? (
                <Stack.Screen name={"Search"} component={Search} />
            ) : null}
            {screenName === "Me" ? (
                <Stack.Screen name={"Me"} component={Me} />
            ) : null}
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Shop" component={ShopScreen} />
            <Stack.Screen name="Likes" component={Likes} />
            <Stack.Screen name="Comments" component={Comments} />
        </Stack.Navigator>
    );
}