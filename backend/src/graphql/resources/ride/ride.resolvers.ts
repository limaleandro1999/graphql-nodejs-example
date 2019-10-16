import * as Bluebird from 'bluebird';

import { RideInstance } from '../../../models/ride';
import { DriverInstance } from '../../../models/driver';
import { DbConnection } from '../../../interfaces/dbconnection.interface';

export const rideResolvers = {
    Query: {
        rides: (parent, args, { db }: { db: DbConnection }): Bluebird<RideInstance[]> => db.Ride.findAll(),
        ride: (parent, { id }, { db }: { db: DbConnection }): Bluebird<RideInstance> => db.Ride.findById(id),
    },

    Ride: {
        driver: (parent): DriverInstance[] => parent.getDriver(),
    },

    Mutation: {
        createRide: (parent, { input }, { db }: { db: DbConnection }): Bluebird<RideInstance> => db.Ride.create(input),

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        updateRide: (parent, { input, id }, { db }: { db: DbConnection }) =>
            db.Ride.update(input, {
                where: {
                    id,
                },
            }).then(() => db.Ride.findById(id)),

        deleteRide: (parent, { id }, { db }: { db: DbConnection }): Bluebird<number> =>
            db.Ride.destroy({
                where: {
                    id,
                },
            }),
    },
};
