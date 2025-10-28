import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,   // ✅ database name
  process.env.DB_USER!,   // ✅ username
  process.env.DB_PASS,   // ✅ password
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 4000,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true, // TiDB Cloud requires SSL
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
