import { gql } from '@apollo/client';

//Create a query to get all Clients 
const GET_CLIENTS = gql`
  query getClients{
    clients {
      id
      name
      email
      phone
    }
  }
`;

//Create query for a single client
const GET_CLIENT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENTS, GET_CLIENT };