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
    istri: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    anak: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tinggal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kerja: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alasan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bantu_apa: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rumusan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "members",
  }
);

// Relasi dengan GroupName
GroupName.hasMany(Member, { foreignKey: "group_id" });
Member.belongsTo(GroupName, { foreignKey: "group_id" });
