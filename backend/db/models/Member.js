import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { GroupName } from "./GroupName.js";

export const Member = sequelize.define(
  "Member",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    istri: DataTypes.STRING,
    anak: DataTypes.STRING,
    tinggal: DataTypes.STRING,
    kerja: DataTypes.STRING,
    alasan: DataTypes.TEXT,
    bantu_apa: DataTypes.TEXT,
    rumusan: DataTypes.TEXT,
  },
  {
    timestamps: false,
    tableName: "Members",
  }
);

// Relasi dengan GroupName
GroupName.hasMany(Member, { foreignKey: "group_id" });
Member.belongsTo(GroupName, { foreignKey: "group_id" });
