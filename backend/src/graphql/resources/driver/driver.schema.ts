const driverTypes = `
    scalar Date
 
    type Driver {
        id: ID!
        name: String!
        dateCreation: Date!
        rides: [Ride!]!
        countRides: Int!
    }

    input DriverCreateInput {
        name: String!
        dateCreation: Date!
    }

    input DriverUpdateInput {
        name: String
        dateCreation: Date
    }
`;

const driverQueries = `
    drivers: [Driver!]!
    driver(id: ID!): Driver
`;

const driverMutations = `
    createDriver(input: DriverCreateInput!): Driver
    updateDriver(id: ID!, input: DriverUpdateInput): Driver
    deleteDriver(id: ID!): Int!
`;

export { driverTypes, driverQueries, driverMutations };
