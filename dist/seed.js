"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./config/database"));
const favoritemodel_1 = require("./models/favoritemodel");
const seed = async () => {
    await database_1.default.sync({ force: true });
    await favoritemodel_1.Favorite.bulkCreate([
        {
            title: "Inception",
            type: "Movie",
            director: "Christopher Nolan",
            budget: "$160M",
            location: "LA, Paris",
            duration: "148 min",
            year: "2010"
        },
        {
            title: "Breaking Bad",
            type: "TV Show",
            director: "Vince Gilligan",
            budget: "$3M/ep",
            location: "Albuquerque",
            duration: "49 min/ep",
            year: "2008-2013"
        },
        {
            title: "The Witcher",
            type: "TV Show",
            director: "Lauren Schmidt Hissrich",
            budget: "$6M/ep",
            location: "Various (UK/Europe)",
            duration: "60 min/ep",
            year: "2019-"
        }
    ]);
    console.log("Seed data inserted");
    process.exit(0);
};
seed().catch(err => {
    console.error(err);
    process.exit(1);
});
