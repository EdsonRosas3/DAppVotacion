import { Model, DataTypes } from "sequelize";
import Product from "./Product";
import sequelize from "../db.connection";

class Image extends Model {}
Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      
    },
    original_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    public_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
      onDelete:"CASCADE",
      onUpdate:"CASCADE",
    },
  },
  {
    sequelize,
    modelName: "image",
    timestamps: false,
  }
);

export default Image;
