import { driverQueries } from './resources/driver/driver.schema';
import { rideQueries } from './resources/ride/ride.schema';

const Query = `
    type Query{
        ${driverQueries}
        ${rideQueries}
    }
`;

export { Query };
