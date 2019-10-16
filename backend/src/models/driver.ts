import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/base-model.interface';

export interface DriverAttributes {
    id?: number;
    name: string;
    dateCreation: Date;
}

export interface DriverInstance extends Sequelize.Instance<DriverAttributes>, DriverAttributes {}

export interface DriverModel extends BaseModelInterface, Sequelize.Model<DriverInstance, DriverAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): DriverModel => {
    const Driver: DriverModel = sequelize.define(
        'Driver',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dateCreation: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: 'drivers',
        },
    );

    Driver.associate = (models): void => {
        Driver.hasMany(models.Ride, { foreignKey: 'driverId' });
    };

    return Driver;
};
