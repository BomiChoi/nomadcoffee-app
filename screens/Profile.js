import React from "react";
import { useReactiveVar } from '@apollo/client';
import LogIn from "./LogIn";
import { isLoggedInVar } from '../apollo';
import UserProfile from "./UserProfile";


export default function Profile() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    return (!isLoggedIn ? <LogIn /> : <UserProfile />);
};