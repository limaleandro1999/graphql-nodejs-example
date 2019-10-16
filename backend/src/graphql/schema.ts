import { merge } from 'lodash';

import { Query } from './query';
import { Mutation } from './mutation';

import { driverTypes } from './resources/driver/driver.schema';
import { rideTypes } from './resources/ride/ride.schema';

import { driverResolvers } from './resources/driver/driver.resolvers';
import { rideResolvers } from './resources/ride/ride.resolvers';

const resolvers = merge(driverResolvers, rideResolvers);

const SchemaDefinition = `
    type Schema {
        query: Query,
        mutation: Mutation
    }
`;

export default {
    typeDefs: [SchemaDefinition, Query, Mutation, driverTypes, rideTypes],
    resolvers,
};
