import { driverMutations } from './resources/driver/driver.schema';
import { rideMutations } from './resources/ride/ride.schema';

const Mutation = `
    type Mutation{
        ${driverMutations}
        ${rideMutations}
    }
`;

export { Mutation };
