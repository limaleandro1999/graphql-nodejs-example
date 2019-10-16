import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

export const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

export const GET_DRIVERS = gql`
    query{
        drivers{
            id,
            name,
            countRides
        }
    }
`;

export const DELETE_DRIVER = gql`
    mutation DeleteDriver($id: ID!){
        deleteDriver(id: $id)
    }
`;

export const GET_DRIVER = gql`
    query Driver($id: ID!){
        driver(id: $id){
            id,
            name,
            dateCreation,
            rides{
                from,
                to,
                value
            }
        }
    }
`;

export const CREATE_DRIVER = gql`
    mutation CreateDriver($input: DriverCreateInput!){
        createDriver(input: $input){
            id,
            name,
            dateCreation
        }
    }
` ;

export const UPDATE_DRIVER = gql`
    mutation UpdateDriver($id: ID!, $input: DriverUpdateInput!){
        updateDriver(id: $id, input: $input)
    }
`;

export const CREATE_RIDE = gql`
    mutation CreateRide($input: RideCreateInput!){
        createRide(input: $input){
            from,
            to,
            value
        }
    }
`;
