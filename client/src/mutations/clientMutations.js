import { gql } from '@apollo/client';

//Create mutation to add client
const ADD_CLIENT = gql`
    mutation addClient($name: String!, $email: String!, $phone: String!){
        addClient(name: $name, email: $email, phone: $phone){
            id
            name
            email
            phone
        }
    }
`;

//Create mutation to delete client
const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id) {
            id
            name
            email
            phone
        }
    }
`;

//Create mutation to update client
const UPDATE_CLIENT = gql`
    mutation updateClient($name: String!, $email: String!, $phone: String!){
        updateClient(name: $name, email: $email, phone: $phone){
            id
            name
            email
            phone
        }
    }
    `;


export { ADD_CLIENT, DELETE_CLIENT, UPDATE_CLIENT };