import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import favoritesRouter from "./routes/faviorites";
import  sequelize from "./config/database";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));

app.get("/", (req, res) => res.json({ ok: true }));

app.use("/api/favorites", favoritesRouter);

const PORT = Number(process.env.PORT || 4000);

(async () => {
  try {
    await sequelize.authenticate();
    // NOTE: For dev we sync with alter:true. For production use migrations.
    await sequelize.sync({ alter: true });
    console.log("Database connected and models synced");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
