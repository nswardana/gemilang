import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

export const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});
