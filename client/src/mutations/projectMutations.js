import { gql } from '@apollo/client';

//Create mutation to add project
const ADD_PROJECT = gql`
  mutation AddProject( $name: String!, $description: String!, $status: ProjectStatus!, $clientId: ID!) {
    addProject( name: $name, description: $description, status: $status, clientId: $clientId) {
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

//Create mutation to delete client
const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
        }
    }
`;

//Create mutation to update project
const UPDATE_PROJECT = gql`
  mutation updateProject( $id: ID!, $name: String!, $description: String!, $status: ProjectStatusUpdate! ) {
    updateProject( id: $id, name: $name, description: $description, status: $status ) {
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

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };