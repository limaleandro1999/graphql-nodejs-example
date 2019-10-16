const rideTypes = `
    type Ride {
        id: ID!
        driver: Driver!
        from: String!
        to: String!
        value: Float!
    }

    input RideCreateInput {
        driverId: ID!
        from: String!
        to: String!
        value: Float!
    }

    input RideUpdateInput {
        driverId: ID
        from: String
        to: String
        value: Float
    }
`;

const rideQueries = `
    ride(id: ID!): Ride
    rides: [Ride!]!
`;

const rideMutations = `
    createRide(input: RideCreateInput): Ride
    updateRide(id: ID!, input: RideUpdateInput): Ride
    deleteRide(id: ID!): Int!
`;

export { rideTypes, rideQueries, rideMutations };
