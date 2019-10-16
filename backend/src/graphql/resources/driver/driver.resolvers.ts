import * as Bluebird from 'bluebird';

import { DriverInstance } from '../../../models/driver';
import { RideInstance } from '../../../models/ride';
import { DbConnection } from '../../../interfaces/dbconnection.interface';

export const driverResolvers = {
    Query: {
        drivers: (parent, args, { db }: { db: DbConnection }): Bluebird<DriverInstance[]> => db.Driver.findAll(),
        driver: (parent, { id }, { db }: { db: DbConnection }): Bluebird<DriverInstance> => db.Driver.findById(id),
    },

    Driver: {
        rides: (parent): RideInstance[] => parent.getRides(),
        countRides: (parent): number => parent.countRides(),
    },

    Mutation: {
        createDriver: (parent, { input }, { db }: { db: DbConnection }): Bluebird<DriverInstance> =>
            db.Driver.create(input),

        updateDriver: (parent, { input, id }, { db }: { db: DbConnection }): Promise<DriverInstance> =>
            db.Driver.update(input, {
                where: {
                    id,
                },
            }).then(() => db.Driver.findById(id)),

        deleteDriver: (parent, { id }, { db }: { db: DbConnection }): Bluebird<number> =>
            db.Driver.destroy({
                where: {
                    id,
                },
            }),
    },
};
