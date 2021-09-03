import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Image, useWindowDimensions } from "react-native";
import { colors } from "../colors";
import PropTypes from "prop-types";

const Container = styled.View`
    border: 1px solid gray;
    margin-bottom: 10px;
`;
const Header = styled.View`
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
    margin-right: 10px;
    width: 25px;
    height: 25px;
    border-radius: 12.5px;
`;
const Username = styled.Text`
    color: white;
    font-weight: 600;
`;
const Photos = styled.View``;
const File = styled.Image``;
const Contents = styled.View`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;
const Name = styled.Text`
    color: ${colors.coffee};
    font-size: 20px;
    font-weight: bold;
    margin: 10px;
`;
const Location = styled.Text`
    color: white;
`;
const CategoryContainer = styled.View`
    display: flex;
    flex-direction: row;
`;
const Category = styled.Text`
    color: ${colors.coffee};
    margin: 5px;
`;

function Shop({ id, name, latitude, longitude, user, photos, categories }) {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();
    const [imageHeight, setImageHeight] = useState(height - 450);
    return (
        <Container>
            <Header onPress={() => navigation.navigate("Profile")}>
                <Avatar resizeMode="cover" source={{ uri: user.avatarURL }} />
                <Username>{user.username}</Username>
            </Header>
            <Photos>
                {photos?.map(photo => {
                    useEffect(() => {
                        Image.getSize(photo.url, (width, height) => {
                            setImageHeight(height / 3);
                        });
                    }, [photo.url]);
                    return <File
                        resizeMode="cover"
                        style={{
                            width,
                            height: imageHeight,
                        }}
                        source={{ uri: photo.url }}
                        key={photo.id}
                    />
                }

                )}
            </Photos>
            <Contents>
                <Name>{name}</Name>
                <Location>Location: {latitude}, {longitude}</Location>
                <CategoryContainer>
                    {categories?.map(category =>
                        <Category key={category.name}>{category.name}</Category>
                    )}
                </CategoryContainer>
            </Contents>
        </Container>
    );
}

Shop.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    user: PropTypes.shape({
        avatarURL: PropTypes.string,
        username: PropTypes.string.isRequired,
    }).isRequired,
    photos: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
    })),
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
    })),
};
export default Shop;