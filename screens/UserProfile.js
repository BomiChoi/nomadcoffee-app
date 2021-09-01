import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useQuery, gql } from "@apollo/client";
import useUser from "../useUser";
import Loading from "../components/Loading";
import { logUserOut } from '../apollo';

const Container = styled.View`
    margin: 10px;
    display: flex;
    align-items: center;
`;
const UserAvatar = styled.Image`
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
`;

const PROFILE_QUERY = gql`
    query seeProfile($username: String!) {
        seeProfile(username: $username){
            email
            name
            location
            githubUsername
            avatarURL
        }
    }
`;

export default function UserProfile() {
    // const { data: user, loading: userLoading } = useUser();
    const userLoading = false;
    let username = "hibomi97"
    // if (!userLoading) {
    //     username = user.me.username;
    // }
    const { data, loading } = useQuery(PROFILE_QUERY, {
        variables: { username }
    })

    return (
        (userLoading || loading) ?
            <Loading />
            : <View style={{
                backgroundColor: "black",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Text style={{ color: "white", fontSize: 25 }}>Profile</Text>
                <Container>
                    <UserAvatar resizeMode="cover" source={{ uri: data?.seeProfile?.avatarURL }} />
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>{username}</Text>
                    <Text style={{ color: "white" }}>Email: {data?.seeProfile?.email}</Text>
                    <Text style={{ color: "white" }}>Location: {data?.seeProfile?.location}</Text>
                    <Text style={{ color: "white" }}>Github ID: {data?.seeProfile?.githubUsername}</Text>
                </Container>
                <TouchableOpacity onPress={logUserOut}>
                    <Text style={{
                        color: "black",
                        backgroundColor: "white",
                        padding: 5,
                        marginTop: 5,
                    }}>Log Out</Text>
                </TouchableOpacity>
            </View>
    );
};