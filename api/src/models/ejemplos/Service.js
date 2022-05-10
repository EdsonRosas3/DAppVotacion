import { Model, DataTypes } from 'sequelize';
import TypeService from './TypeService';
import sequelize from '../db.connection';
import Price from './Price';

class Service extends Model {}
Service.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Price,
      key: 'id'
    }
  },
  description: {
    type: DataTypes.STRING(8000),
    allowNull: true
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  typeService_id: {
    type: DataTypes.INTEGER,
    references: {
      model: TypeService,
      key: 'id'
    }
  },
  default_image:{
    type: DataTypes.STRING,
    allowNull: true
  }
}, 
  {
    sequelize,
    modelName: "service",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Service;