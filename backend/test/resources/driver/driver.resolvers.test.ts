import { db, handleError, expect, request } from './../../test-utils';
import { DriverInstance } from '../../../src/models/driver';

describe('Driver', () => {
    let driverId: number;

    beforeEach(async () => {
        try {
            await db.Ride.destroy({ where: {} });
            await db.Driver.destroy({ where: {} });

            const drivers: DriverInstance[] = await db.Driver.bulkCreate([
                {
                    name: 'John Red',
                    dateCreation: new Date(),
                },
                {
                    name: 'George Martin',
                    dateCreation: new Date(),
                },
                {
                    name: 'Cassandra Clare',
                    dateCreation: new Date(),
                },
                {
                    name: 'J.K Rowling',
                    dateCreation: new Date(),
                },
            ]);

            driverId = drivers[0].id;
        } catch (error) {
            console.log(error);
        }
    });

    describe('Queries', () => {
        describe('application/json', () => {
            describe('drivers', () => {
                it('should return a list of Drivers', async () => {
                    const body = {
                        query: `
                            query {
                                drivers{
                                    name,
                                    dateCreation,
                                }
                            }
                        `,
                    };

                    try {
                        const response = await request
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body));

                        const driversList = response.body.data.drivers;

                        expect(response.body.data).to.be.an('object');
                        expect(driversList).to.be.an('array');
                        expect(driversList)
                            .to.be.an('array')
                            .of.length(4);
                        expect(driversList[0]).to.have.keys(['name', 'dateCreation']);
                        expect(driversList[0]).to.not.have.keys(['rides']);
                    } catch (error) {
                        handleError(error);
                    }
                });
            });

            describe('driver', () => {
                it('should return a single Driver', async () => {
                    const body = {
                        query: `
                            query Driver($id: ID!){
                                driver(id: $id){
                                    name,
                                    dateCreation,
                                    rides{
                                        from,
                                        to,
                                        value
                                    }
                                }
                            }
                        `,
                        variables: {
                            id: driverId,
                        },
                    };

                    try {
                        const response = await request
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body));

                        const driver = response.body.data.driver;

                        expect(response.body.data).to.be.an('object');
                        expect(driver).to.be.an('object');
                        expect(driver).to.be.not.null;
                        expect(driver.name).equals('John Red');
                        expect(driver).to.have.keys(['name', 'dateCreation', 'rides']);
                        expect(driver.rides).to.be.an('array');
                        expect(driver.rides)
                            .to.be.an('array')
                            .of.length(0);
                    } catch (error) {
                        handleError(error);
                    }
                });

                it("should return only 'name' attribute from Driver", async () => {
                    const body = {
                        query: `
                            query Driver($id: ID!){
                                driver(id: $id){
                                    name,
                                }
                            }
                        `,
                        variables: {
                            id: driverId,
                        },
                    };

                    try {
                        const response = await request
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body));

                        const driver = response.body.data.driver;

                        expect(response.body.data).to.be.an('object');
                        expect(driver).to.be.an('object');
                        expect(driver).to.be.not.null;
                        expect(driver.name).equals('John Red');
                        expect(driver).to.have.keys(['name']);
                        expect(driver).to.not.have.keys(['dateCreation', 'rides']);
                    } catch (error) {
                        handleError(error);
                    }
                });

                it('should return null', async () => {
                    const body = {
                        query: `
                            query Driver($id: ID!){
                                driver(id: $id){
                                    name,
                                    dateCreation,
                                }
                            }
                        `,
                        variables: {
                            id: 1000,
                        },
                    };

                    try {
                        const response = await request
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body));

                        const driver = response.body.data.driver;

                        expect(driver).to.be.null;
                    } catch (error) {
                        handleError(error);
                    }
                });
            });
        });
    });

    describe('Mutations', () => {
        describe('application/json', () => {
            describe('createDriver', () => {
                it('should create a new Driver', async () => {
                    const body = {
                        query: `
                            mutation CreateDriver($input: DriverCreateInput!){
                                createDriver(input: $input){
                                    id,
                                    name,
                                    dateCreation
                                }
                            }
                        `,
                        variables: {
                            input: {
                                name: 'John Connor',
                                dateCreation: new Date(),
                            },
                        },
                    };

                    try {
                        const response = await request
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body));

                        const driver = response.body.data.createDriver;

                        expect(response.body.data).to.be.an('object');
                        expect(driver).to.be.an('object');
                        expect(driver).to.be.not.null;
                        expect(driver.name).equals('John Connor');
                        expect(parseInt(driver.id)).to.be.a('number');
                        expect(driver).to.have.keys(['id', 'name', 'dateCreation']);
                    } catch (error) {
                        handleError(error);
                    }
                });
            });

            describe('update Driver', () => {
                it('should update an existent Driver', async () => {
                    const body = {
                        query: `
                            mutation UpdateDriver($id: ID!, $input: DriverUpdateInput){
                                updateDriver(id: $id, input: $input){
                                    name,
                                    dateCreation
                                }
                            }
                        `,
                        variables: {
                            id: driverId,
                            input: {
                                name: 'John Blue',
                            },
                        },
                    };

                    try {
                        const response = await request
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body));

                        const driver = response.body.data.updateDriver;

                        expect(response.body.data).to.be.an('object');
                        expect(driver).to.be.an('object');
                        expect(driver).to.has.keys(['name', 'dateCreation']);
                        expect(driver.name).to.be.equals('John Blue');
                    } catch (error) {
                        handleError(error);
                    }
                });
            });
        });
    });
});
