import React from "react";
import { View, Text } from "react-native";

export default function Search() {
    return (
        <View style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Text style={{ color: "white", fontSize: 25 }}>Search</Text>
        </View>
    );
}