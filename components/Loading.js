import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

const SLoading = styled.Text`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    color: white;
`;

function Loading() {
    return (
        <View style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <SLoading>Loading...</SLoading>
        </View>
    );
}
export default Loading;