import { ModelsInterface } from './models.interface';

export interface BaseModelInterface {
    prototype?;
    associate?(models: ModelsInterface): void;
}
