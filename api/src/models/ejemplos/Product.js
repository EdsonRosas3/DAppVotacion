import { Model, DataTypes } from 'sequelize';
import Category from './Category';
import sequelize from '../db.connection';
import Price from './Price';

class Product extends Model {}
Product.init({
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
    allowNull: true
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
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
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
    modelName: "product",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default  Product;
