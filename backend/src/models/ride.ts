import * as Sequelize from 'sequelize';

import { BaseModelInterface } from '../interfaces/base-model.interface';

export interface RideAttributes {
    id?: number;
    driverId?: number;
    from: string;
    to: string;
    value: number;
}

export interface RideInstance extends Sequelize.Instance<RideAttributes>, RideAttributes {}

export interface RideModel extends BaseModelInterface, Sequelize.Model<RideInstance, RideAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): RideModel => {
    const Ride: RideModel = sequelize.define(
        'Ride',
        {
            from: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            to: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            value: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
        },
        {
            tableName: 'rides',
        },
    );

    Ride.associate = (models): void => {
        Ride.belongsTo(models.Driver, { foreignKey: 'driverId' });
    };

    return Ride;
};
