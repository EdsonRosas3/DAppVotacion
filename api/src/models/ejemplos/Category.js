import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.connection';

class Category extends Model {}
Category.init({
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
    modelName: "category",
    timestamps: false
});

export default Category;
