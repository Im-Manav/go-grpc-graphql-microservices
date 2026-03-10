import { request } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql';

export const graphqlClient = async (query: any, variables?: any) => {
  try {
    const data = await request(endpoint, query, variables);
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error?.message || 'GraphQL Error' };
  }
};
