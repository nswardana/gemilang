import { sequelize } from "./config.js";
import { Category } from "./models/Category.js";
import { GroupName } from "./models/GroupName.js";
import { Member } from "./models/Member.js";

export async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL with Sequelize");

    // sync models
    await sequelize.sync({ alter: true });
    console.log("✅ All models synchronized");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw error;
  }
}

export { Category, GroupName, Member };
