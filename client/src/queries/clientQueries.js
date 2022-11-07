import { gql } from '@apollo/client';

//Create a query called to getClients to get all Clients 
const GET_CLIENTS = gql`
  query getClients{
    clients {
      id
      name
      email
      phone
    }
  }
`

export { GET_CLIENTS };