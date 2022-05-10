import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.connection';

class Price extends Model {}
Price.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    unitPrice: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "price",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Price;