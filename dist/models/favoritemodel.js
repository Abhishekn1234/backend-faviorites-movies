"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorite = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Favorite extends sequelize_1.Model {
}
exports.Favorite = Favorite;
Favorite.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    title: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    type: { type: sequelize_1.DataTypes.ENUM("Movie", "TV Show"), allowNull: false },
    director: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    budget: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    location: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    duration: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    year: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    posterUrl: { type: sequelize_1.DataTypes.STRING(2048), allowNull: true }
}, {
    sequelize: database_1.default,
    tableName: "favorites",
    timestamps: true
});
