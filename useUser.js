import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "./apollo";

const ME_QUERY = gql`
    query me{
        me{
            id
            username
            avatarURL
        }
    }
`;

function useUser() {
    const hasToken = useReactiveVar(isLoggedInVar);
    const { data, loading, error } = useQuery(ME_QUERY, {
        skip: !hasToken
    });
    // 토큰이 유효하지 않으면 로그아웃시킴
    useEffect(() => {
        if (data?.me === null) {
            console.log("Invalid Token");
            logUserOut();
        }
    }, [data])
    return { data, loading, error };
}

export default useUser;