import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.connection';

class TypeService extends Model {}
TypeService.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "typeservice",
    timestamps: false
});

export default TypeService;