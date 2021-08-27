import React from "react";
import { View, Text } from "react-native";
import { useQuery, gql } from "@apollo/client";
import useUser from "../useUser";
import Loading from "../components/Loading"

const PROFILE_QUERY = gql`
    query seeProfile($username: String!) {
        seeProfile(username: $username){
            email
            name
            location
            githubUsername
        }
    }
`;

export default function UserProfile() {
    const { data: user, loading: userLoading } = useUser();
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
                justifyContent: "center"
            }}>
                <Text style={{ color: "white", fontSize: 25 }}>Profile</Text>
                <Text style={{ color: "white" }}>{username}</Text>
                <Text style={{ color: "white" }}>{data?.seeProfile?.email}</Text>
                <Text style={{ color: "white" }}>{data?.seeProfile?.location}</Text>
                <Text style={{ color: "white" }}>{data?.seeProfile?.githubUsername}</Text>
            </View>
    );
};