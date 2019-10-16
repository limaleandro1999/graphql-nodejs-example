/* eslint-disable @typescript-eslint/no-explicit-any */
import * as chai from 'chai';
import chaiHttp from 'chai-http';

import Server from '../src/config/server';
import db from '../src/models';

chai.use(chaiHttp);
const expect = chai.expect;

const chaiLib = chai as any;
const chaiRequestLib = chaiLib.default.request;
const request = chaiRequestLib(Server.app);

const handleError = (error): Promise<never> => {
    const message: string = error.response ? error.response.res.text : error.message || error;

    throw new Error(`${error.name}: ${message}`);
};

export { db, expect, handleError, request };
