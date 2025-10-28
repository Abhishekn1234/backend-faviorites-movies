"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDB = exports.Favorite = exports.sequelize = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
const favoritemodel_1 = require("./favoritemodel");
Object.defineProperty(exports, "Favorite", { enumerable: true, get: function () { return favoritemodel_1.Favorite; } });
// optional helper to sync/pass options
const syncDB = async (opts = { alter: true }) => {
    await database_1.default.sync(opts);
};
exports.syncDB = syncDB;
