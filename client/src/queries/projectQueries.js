import { gql } from '@apollo/client';

//Create a query to get all Projects
const GET_PROJECTS = gql`
  query getClients{
    projects {
      id
      name
      status
    }
  }
`;

//Create query for a single project
const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT };