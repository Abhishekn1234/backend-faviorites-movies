import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

console.log("🧩 Connecting to:", process.env.DB_HOST, ":", process.env.DB_PORT);

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT) || 4000,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("✅ Connected to TiDB Cloud MySQL successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

export default sequelize;
