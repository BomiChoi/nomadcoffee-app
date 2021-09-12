import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { gql, useMutation } from "@apollo/client";
import { SHOP_FRAGMENT } from "../fragments";
import { ReactNativeFile } from "apollo-upload-client";

const CREATE_COFFEESHOP_MUTATION = gql`
    mutation createCoffeeShop($shopName: String!, $latitude: String!, $longitude: String!, $categoryTxt: String) {
        createCoffeeShop(name: $shopName, latitude: $latitude, longitude: $longitude, categoryTxt: $categoryTxt) {
            ...ShopFragment
        }
    }
    ${SHOP_FRAGMENT}
`;
const UPLOAD_PHOTO_MUTATION = gql`
    mutation uploadPhoto($file: Upload!, $shopId: Int!){
        uploadPhoto(file: $file, shopId: $shopId){
            ok
            error
        }
    }
`;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const InputContainer = styled.View`
  margin-top: 10px;
`;
const Input = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
  margin: 5px 0;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function UploadForm({ route, navigation }) {
    const updateCreateShop = (cache, result) => {
        const {
            data: { createCoffeeShop },
        } = result;
        if (createCoffeeShop.id) {
            const file = new ReactNativeFile({
                uri: route.params.file,
                name: `1.jpeg`,
                type: "image/jpeg",
            });
            uploadPhotoMutation({
                variables: {
                    file,
                    shopId: createCoffeeShop.id
                },
            });
        }
    };
    const updateUploadPhoto = (cache, result) => {
        const {
            data: { uploadPhoto },
        } = result;
        if (uploadPhoto.ok) {
            navigation.navigate("Tabs");
        }

    }
    const [createCoffeeShopMutation, { data: shopData, loading: shopLoading, error: shopError }] = useMutation(CREATE_COFFEESHOP_MUTATION,
        {
            update: updateCreateShop,
        }
    );
    const [uploadPhotoMutation, { data: photoData, loading: photoLoading, error: photoError }] = useMutation(UPLOAD_PHOTO_MUTATION,
        {
            update: updateUploadPhoto,
        }
    );
    const { register, handleSubmit, setValue } = useForm();

    const HeaderRight = () => (
        <TouchableOpacity onPress={handleSubmit(onValid)}>
            <HeaderRightText>Next</HeaderRightText>
        </TouchableOpacity>
    );
    const HeaderRightLoading = () => (
        <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
    );

    useEffect(() => {
        register("name");
        register("latitude");
        register("longitude");
        register("categoryTxt");
    }, [register]);
    useEffect(() => {
        navigation.setOptions({
            headerRight: (shopLoading || photoLoading) ? HeaderRightLoading : HeaderRight,
            ...((shopLoading || photoLoading) && { headerLeft: () => null }),
            headerLeft: () => null,
        });
    }, []);
    const onValid = ({ shopName, latitude, longitude, categoryTxt }) => {
        createCoffeeShopMutation({
            variables: {
                shopName,
                latitude,
                longitude,
                categoryTxt
            },
        });
    };
    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();
    return (
        <DismissKeyboard>
            <Container
                style={{
                    width: "100%",
                }}
                behavior="position"
                keyboardVerticalOffset={Platform.os === "ios" ? 50 : 0}
            >
                <Photo resizeMode="contain" source={{ uri: route.params.file }} />
                <InputContainer>
                    <Input
                        returnKeyType="next"
                        placeholder="Name"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        onChangeText={(text) => setValue("shopName", text)}
                        onSubmitEditing={() => input2.current.focus()}
                    />
                    <Input
                        returnKeyType="next"
                        placeholder="Latitude"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        onChangeText={(text) => setValue("latitude", text)}
                        onSubmitEditing={() => input3.current.focus()}
                        ref={input2}
                    />
                    <Input
                        returnKeyType="next"
                        placeholder="Longitude"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        onChangeText={(text) => setValue("longitude", text)}
                        onSubmitEditing={() => input4.current.focus()}
                        ref={input3}
                    />
                    <Input
                        returnKeyType="done"
                        placeholder="Category (Use # to seperate)"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        onChangeText={(text) => setValue("categoryTxt", text)}
                        onSubmitEditing={handleSubmit(onValid)}
                        ref={input4}
                    />
                </InputContainer>
            </Container>
        </DismissKeyboard>
    );
}
