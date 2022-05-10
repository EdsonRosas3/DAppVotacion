import { Model, DataTypes } from "sequelize";
import Service from "./Service";
import sequelize from "../db.connection";

class ImageService extends Model {}
ImageService.init(
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
    service_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Service,
        key: "id",
      },
      onDelete:"CASCADE",
      onUpdate:"CASCADE",
    },
  },
  {
    sequelize,
    modelName: "imageservice",
    timestamps: false,
  }
);

export default ImageService;
