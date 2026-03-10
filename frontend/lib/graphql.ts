import { gql } from 'graphql-request';

export const GET_ACCOUNTS = gql`
  query GetAccounts($pagination: PaginationInput, $id: String) {
    accounts(pagination: $pagination, id: $id) {
      id
      name
      orders {
        id
        createdAt
        totalPrice
        products {
          id
          name
          description
          price
          quantity
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($pagination: PaginationInput, $query: String, $id: String) {
    products(pagination: $pagination, query: $query, id: $id) {
      id
      name
      description
      price
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($account: AccountInput!) {
    createAccount(account: $account) {
      id
      name
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($product: ProductInput!) {
    createProduct(product: $product) {
      id
      name
      description
      price
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($order: OrderInput!) {
    createOrder(order: $order) {
      id
      createdAt
      totalPrice
      products {
        id
        name
        description
        price
        quantity
      }
    }
  }
`;
