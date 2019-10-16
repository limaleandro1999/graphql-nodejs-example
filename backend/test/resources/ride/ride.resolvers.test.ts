import { db, handleError, expect, request } from './../../test-utils';
import { DriverInstance } from '../../../src/models/driver';
import { RideInstance } from '../../../src/models/ride';

describe('Ride', () => {
    let driverId: number;
    let rideId: number;

    beforeEach(async () => {
        try {
            await db.Ride.destroy({ where: {} });
            await db.Driver.destroy({ where: {} });

            const driver: DriverInstance = await db.Driver.create({
                name: 'Brie Larson',
                dateCreation: new Date(),
            });

            const rides: RideInstance[] = await db.Ride.bulkCreate([
                {
                    from: '344, C Avenue',
                    to: '566, F Street',
                    value: 45,
                    driverId: driver.id,
                },
                {
                    from: '657, Chaos Street',
                    to: '746, Peace Avenue',
                    value: 78,
                    driverId: driver.id,
                },
                {
                    from: 'Avengers HQ',
                    to: 'Home',
                    value: 125,
                    driverId: driver.id,
                },
                {
                    from: 'Iguatemi Shopping',
                    to: 'Prainha',
                    value: 78,
                    driverId: driver.id,
                },
            ]);

            driverId = driver.id;
            rideId = rides[0].id;
        } catch (error) {
            console.log(error);
        }
    });

    describe('Queries', () => {
        describe('application/json', () => {
            describe('rides', () => {
                it('should return a list of Rides', async () => {
                    const body = {
                        query: `
                            query {
                                rides{
                                    from,
                                    to,
                                    driver{
                                        name
                                    }
                                }
                            }
                        `,
                    };

                    try {
                        const response = await request
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body));

                        const ridesList = response.body.data.rides;

                        expect(response.body.data).to.be.an('object');
                        expect(ridesList).to.be.an('array');
                        expect(ridesList)
                            .to.be.an('array')
                            .of.length(4);
                        expect(ridesList[0]).to.have.keys(['from', 'to', 'driver']);
                        expect(ridesList[0].driver).to.have.keys(['name']);
                        expect(ridesList[0]).to.not.have.keys(['value']);
                        expect(ridesList[0].driver).to.not.have.keys(['dateCreation']);
                    } catch (error) {
                        handleError(error);
                    }
                });
            });

            describe('ride', () => {
                it('should return a single Ride', async () => {
                    const body = {
                        query: `
                            query Ride($id: ID!){
                                ride(id: $id){
                                    from,
                                    to,
                                    value
                                    driver{
                                        name
                                    }
                                }
                            }
                        `,
                        variables: {
                            id: rideId,
                        },
                    };

                    try {
                        const response = await request
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body));

                        const ride = response.body.data.ride;

                        expect(response.body.data).to.be.an('object');
                        expect(ride).to.be.an('object');
                        expect(ride).to.be.not.null;
                        expect(ride.from).equals('344, C Avenue');
                        expect(ride.to).equals('566, F Street');
                        expect(ride.value).equals(45);
                        expect(ride.driver.name).equals('Brie Larson');
                        expect(ride).to.have.keys(['from', 'to', 'value', 'driver']);
                    } catch (error) {
                        handleError(error);
                    }
                });
            });
        });
    });

    describe('Mutations', () => {
        describe('application/json', () => {
            describe('createRide', () => {
                it('should create a new Ride', async () => {
                    const body = {
                        query: `
                            mutation CreateRide($input: RideCreateInput!){
                                createRide(input: $input){
                                    from,
                                    to,
                                    value
                                    driver{
                                        name,
                                        dateCreation
                                    }
                                }
                            }
                        `,
                        variables: {
                            input: {
                                from: '89, Dina Sfat',
                                to: '526, Vasco de Ataíde',
                                value: 37,
                                driverId,
                            },
                        },
                    };

                    try {
                        const response = await request
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body));

                        const ride = response.body.data.createRide;

                        expect(response.body.data).to.be.an('object');
                        expect(ride).to.be.an('object');
                        expect(ride).to.be.not.null;
                        expect(ride.from).equals('89, Dina Sfat');
                        expect(ride.to).equals('526, Vasco de Ataíde');
                        expect(ride.value).equals(37);
                        expect(ride.driver.name).equals('Brie Larson');
                        expect(ride).to.have.keys(['from', 'to', 'value', 'driver']);
                    } catch (error) {
                        handleError(error);
                    }
                });
            });

            describe('updateRide', () => {
                it('should update a ride', async () => {
                    const body = {
                        query: `
                            mutation UpdateRide($id: ID!, $input: RideUpdateInput){
                                updateRide(id: $id, input: $input){
                                    from,
                                    to,
                                    value
                                    driver{
                                        name,
                                        dateCreation
                                    }
                                }
                            }
                        `,
                        variables: {
                            input: {
                                value: 345,
                            },
                            id: rideId,
                        },
                    };

                    try {
                        const response = await request
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body));

                        const ride = response.body.data.updateRide;

                        expect(response.body.data).to.be.an('object');
                        expect(ride).to.be.an('object');
                        expect(ride).to.be.not.null;
                        expect(ride.from).equals('344, C Avenue');
                        expect(ride.to).equals('566, F Street');
                        expect(ride.value).equals(345);
                        expect(ride.driver.name).equals('Brie Larson');
                        expect(ride).to.have.keys(['from', 'to', 'value', 'driver']);
                    } catch (error) {
                        handleError(error);
                    }
                });
            });
        });
    });
});
