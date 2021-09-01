import { gql } from "@apollo/client";

export const SHOP_FRAGMENT = gql`
  fragment ShopFragment on CoffeeShop {
    id
    name
    latitude
    longitude
    user{
      id
      username
      avatarURL
    }
    photos {
      id
      url
    }
    categories {
      id
      name
      slug
    }
  }
`;

export const CATEGORRY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    name
    slug
    shops{
      id
      name
    }
    totalShops
  }
`;

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on CoffeeShopPhoto {
    id
    url
    shop {
      id
      name
    }
  }
`;