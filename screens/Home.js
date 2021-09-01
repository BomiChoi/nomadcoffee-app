import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { SHOP_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import { FlatList } from "react-native";
import Shop from "../components/Shop";

const SEECOFFEESHOPS_QUERY = gql`
    query seeCoffeeShops($offset: Int!) {
        seeCoffeeShops(offset: $offset) {
            ...ShopFragment
        }
    }
    ${SHOP_FRAGMENT}
`;

export default function Home() {
    const { data, loading, refetch, fetchMore } = useQuery(SEECOFFEESHOPS_QUERY, {
        variables: {
            offset: 0,
        },
    });
    const renderShop = ({ item: shop }) => {
        return <Shop {...shop} />;
    };
    const refresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };
    const [refreshing, setRefreshing] = useState(false);
    return (
        <ScreenLayout loading={loading}>
            <FlatList
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
                data={data?.seeCoffeeShops}
                keyExtractor={(shop) => "" + shop.id}
                renderItem={renderShop}
                refreshing={refreshing}
                onRefresh={refresh}
                onEndReachedThreshold={0.05}
                onEndReached={() =>
                    fetchMore({
                        variables: {
                            offset: data?.seeCoffeeShops?.length,
                        },
                    })
                }
            />
        </ScreenLayout>
    );
};