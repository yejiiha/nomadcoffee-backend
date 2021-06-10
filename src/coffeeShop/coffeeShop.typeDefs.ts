import { gql } from "apollo-server-core";

export default gql`
  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String!
    longitude: String!
    user: User
    photos: [CoffeeShopPhoto]
    categories: [Category]
    isMine: Boolean!
  }

  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop!
  }
`;
