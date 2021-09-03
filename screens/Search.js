import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, ActivityIndicator, useWindowDimensions, FlatList, TouchableOpacity, Image } from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";
import styled from "styled-components/native";
import { gql, useLazyQuery } from "@apollo/client";
import Shop from "../components/Shop";
import { SHOP_FRAGMENT } from "../fragments";

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;
const Input = styled.TextInput`
    background-color: rgba(255, 255, 255, 1);
    width: ${(props) => props.width / 1.5}px;
    color: black;
    padding: 5px 10px;
    border-radius: 10px;
`;

const SEARCH_SHOPS = gql`
    query searchCoffeeShops($keyword: String!, $offset: Int!){
        searchCoffeeShops(keyword: $keyword, offset: $offset){
            ...ShopFragment
        }
    }
    ${SHOP_FRAGMENT}
`;

export default function Search({ navigation }) {
    const { width } = useWindowDimensions();
    const { setValue, register, handleSubmit } = useForm();
    const [startQueryFn, { loading, data, called, refetch, fetchMore }] = useLazyQuery(SEARCH_SHOPS);
    const onValid = ({ keyword }) => {
        startQueryFn({
            variables: {
                keyword,
                offset: 0,
            },
        });
    };
    const SearchBox = () => (
        <Input
            width={width}
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            placeholder="Search shops"
            autoCapitalize="none"
            returnKeyLabel="Search"
            returnKeyType="search"
            autoCorrect={false}
            onChangeText={(text) => setValue("keyword", text)}
            onSubmitEditing={handleSubmit(onValid)}
        />
    );
    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox,
        });
        register("keyword", {
            required: true,
            minLength: 3,
        });
    }, []);
    const renderItem = ({ item: shop }) => (
        <TouchableOpacity>
            <Shop {...shop} />
        </TouchableOpacity>
    );
    const refresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };
    const [refreshing, setRefreshing] = useState(false);
    return (
        <DismissKeyboard>
            <View style={{
                backgroundColor: "black",
                flex: 1,
            }}>
                {loading ? (
                    <MessageContainer>
                        <ActivityIndicator size="large" color="white" />
                        <MessageText>Searching...</MessageText>
                    </MessageContainer>
                ) : null}
                {!called ? (
                    <MessageContainer>
                        <MessageText>Search by keyword</MessageText>
                    </MessageContainer>
                ) : null}
                {data?.searchCoffeeShops !== undefined ? (
                    data?.searchCoffeeShops?.length === 0 ? (
                        <MessageContainer>
                            <MessageText>Could not find anything.</MessageText>
                        </MessageContainer>
                    ) : <FlatList
                        style={{ width: "100%" }}
                        data={data?.searchCoffeeShops}
                        keyExtractor={(shop) => "" + shop.id}
                        renderItem={renderItem}
                        refreshing={refreshing}
                        onRefresh={refresh}
                        onEndReachedThreshold={0.05}
                        onEndReached={() =>
                            fetchMore({
                                variables: {
                                    offset: data?.searchCoffeeShops?.length,
                                },
                            })
                        }
                    />
                ) : null}
            </View>
        </DismissKeyboard >
    );
}