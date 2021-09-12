import { Camera } from "expo-camera";
import React, { useEffect, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar, TouchableOpacity, Image, Text, Alert } from "react-native";
import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/core";

const Container = styled.View`
    flex: 1;
    background-color: black;
`;
const Actions = styled.View`
    flex: 0.35;
    padding: 0px 50px;
    align-items: center;
    justify-content: space-around;
`;
const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TakePhotoBtn = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 50px;
    opacity: 0.5;
`;
const SliderContainer = styled.View``;
const ActionsContainer = styled.View`
    flex-direction: row;
`;
const CloseButton = styled.TouchableOpacity`
    position: absolute;
    top: 50px;
    left: 20px;
`;
const PhotoAction = styled.TouchableOpacity`
background-color: white;
padding: 5px 10px;
border-radius: 4px;
`;
const PhotoActionText = styled.Text`
font-weight: 600;
`;


export default function TakePhoto({ navigation }) {
    const camera = useRef();
    const [takenPhoto, setTakenPhoto] = useState("");
    const [cameraReady, setCameraReady] = useState(false);
    const [ok, setOk] = useState(false);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [zoom, setZoom] = useState(0);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const getPermissions = async () => {
        const { granted } = await Camera.requestPermissionsAsync();
        setOk(granted);
    };
    useEffect(() => {
        getPermissions();
    }, []);
    const onCameraSwitch = () => {
        if (cameraType === Camera.Constants.Type.front) {
            setCameraType(Camera.Constants.Type.back);
        } else {
            setCameraType(Camera.Constants.Type.front);
        }
    };
    const onZoomValueChange = (e) => {
        setZoom(e);
    };
    const onFlashChange = () => {
        if (flashMode === Camera.Constants.FlashMode.off) {
            setFlashMode(Camera.Constants.FlashMode.on);
        } else if (flashMode === Camera.Constants.FlashMode.on) {
            setFlashMode(Camera.Constants.FlashMode.auto);
        } else if (flashMode === Camera.Constants.FlashMode.auto) {
            setFlashMode(Camera.Constants.FlashMode.off);
        }
    };
    const goToUpload = async (save) => {
        if (save) {
            await MediaLibrary.saveToLibraryAsync(takenPhoto);
        }
        navigation.navigate("UploadForm", {
            file: takenPhoto,
        })
        console.log("Will upload", takenPhoto);
    };
    const onUpload = () => {
        Alert.alert(
            "Save photo?",
            "Save photo & upload or just upload",
            {
                text: "Save & upload",
                onPress: () => goToUpload(true)
            },
            {
                text: "Just upload",
                onPress: () => goToUpload(false)
            }
        );
    }
    const onCamearReady = () => setCameraReady(true);
    const takePhoto = async () => {
        if (camera.current && cameraReady) {
            const { uri } = await camera.current.takePictureAsync({
                quality: 1,
                exif: true
            });
            setTakenPhoto(uri);
        }
    };
    const onDismiss = () => setTakenPhoto("");
    const isFocused = useIsFocused();

    return (
        <Container>
            {isFocused ? <StatusBar hidden={true} /> : null}
            <StatusBar hidden={true} />
            {takenPhoto === "" ? (
                <Camera
                    type={cameraType}
                    style={{ flex: 1 }}
                    zoom={zoom}
                    flashMode={flashMode}
                    ref={camera}
                    onCameraReady={onCamearReady}
                >
                    <CloseButton onPress={() => navigation.navigate("Tabs")}>
                        <Ionicons name="close" color="white" size={30} />
                    </CloseButton>
                </Camera>
            ) : (
                <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
            )}
            {takenPhoto === "" ? (
                <Actions>
                    <SliderContainer>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="FFFFFF"
                            maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
                            onValueChange={onZoomValueChange}
                        />
                    </SliderContainer>
                    <ButtonsContainer>
                        <TakePhotoBtn onPress={takePhoto} />
                        <ActionsContainer>
                            <TouchableOpacity
                                onPress={onFlashChange}
                                style={{ marginRight: 30 }}
                            >
                                <Ionicons
                                    size={30}
                                    color="white"
                                    name={flashMode === Camera.Constants.FlashMode.off
                                        ? "flash-off"
                                        : flashMode === Camera.Constants.FlashMode.on
                                            ? "flash"
                                            : flashMode === Camera.Constants.FlashMode.auto
                                                ? "eye" : ""}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onCameraSwitch}>
                                <Ionicons
                                    size={30}
                                    color="white"
                                    name={
                                        cameraType === Camera.Constants.Type.front
                                            ? "camera-reverse"
                                            : "camera"
                                    }
                                />
                            </TouchableOpacity>
                        </ActionsContainer>
                    </ButtonsContainer>
                </Actions>
            ) : (
                <Actions>
                    <PhotoAction onPress={onDismiss}>
                        <PhotoActionText>Dismiss</PhotoActionText>
                    </PhotoAction>
                    <PhotoAction>
                        <PhotoActionText onPress={onUpload}>Upload</PhotoActionText>
                    </PhotoAction>
                </Actions>
            )}
        </Container>
    );
}