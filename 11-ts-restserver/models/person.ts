import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export class Person extends Model {
    public name!: string;
    public email!: string;
}

Person.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'persons',
    modelName: 'Person',
    sequelize
});