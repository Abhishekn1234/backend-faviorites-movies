"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const faviorites_1 = __importDefault(require("./routes/faviorites"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: "5mb" }));
app.get("/", (req, res) => res.json({ ok: true }));
app.use("/api/favorites", faviorites_1.default);
const PORT = Number(process.env.PORT || 4000);
(async () => {
    try {
        await database_1.default.authenticate();
        // NOTE: For dev we sync with alter:true. For production use migrations.
        await database_1.default.sync({ alter: true });
        console.log("Database connected and models synced");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
})();
