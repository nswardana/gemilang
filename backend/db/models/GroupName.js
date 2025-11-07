import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { Category } from "./Category.js";

export const GroupName = sequelize.define("GroupName", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: "GroupName"
});

Category.hasMany(GroupName, { foreignKey: "category_id" });
GroupName.belongsTo(Category, { foreignKey: "category_id" });
