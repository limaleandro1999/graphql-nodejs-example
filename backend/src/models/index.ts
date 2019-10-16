import * as fs from 'fs';
import * as path from 'path';

import Sequelize from 'sequelize';

import { DbConnection } from '../interfaces/dbconnection.interface';

const basename: string = path.basename(module.filename);
const env: string = process.env.NODE_ENV || 'development';
const config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
let db = null;

if (!db) {
    db = {};

    const sequelize: Sequelize.Sequelize = new Sequelize(config.database, config.username, config.password, config);

    fs.readdirSync(__dirname)
        .filter((file: string) => {
            const fileSlice: string = file.slice(-3);
            return file.indexOf('.') !== 0 && (file !== basename && (fileSlice === '.js' || fileSlice === '.ts'));
        })
        .forEach((file: string) => {
            const model = sequelize.import(path.join(__dirname, file));
            db[model['name']] = model;
        });

    Object.keys(db).forEach((modelName: string) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db['sequelize'] = sequelize;
}

export default db as DbConnection;
