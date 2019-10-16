import * as Sequelize from 'sequelize';

import { ModelsInterface } from './models.interface';

export interface DbConnection extends ModelsInterface {
    sequelize: Sequelize.Sequelize;
}
