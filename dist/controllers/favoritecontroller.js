"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFavorite = exports.updateFavorite = exports.createFavorite = exports.getFavoriteById = exports.getFavorites = void 0;
const favoritemodel_1 = require("../models/favoritemodel");
const favorite_schema_1 = require("../validation/favorite.schema");
const sequelize_1 = require("sequelize");
/**
 * GET /api/favorites?offset=0&limit=20&search=...&type=Movie
 * returns { total, items }
 */
const getFavorites = async (req, res) => {
    try {
        const limit = Math.min(Number(req.query.limit) || 20, 100);
        const offset = Number(req.query.offset) || 0;
        const where = {};
        // optional search (title, director)
        if (req.query.search) {
            const q = String(req.query.search);
            where[sequelize_1.Op.or] = [
                { title: { [sequelize_1.Op.like]: `%${q}%` } },
                { director: { [sequelize_1.Op.like]: `%${q}%` } }
            ];
        }
        if (req.query.type) {
            where.type = req.query.type;
        }
        const { count, rows } = await favoritemodel_1.Favorite.findAndCountAll({
            where,
            order: [["id", "DESC"]],
            limit,
            offset
        });
        res.json({ total: count, items: rows });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getFavorites = getFavorites;
const getFavoriteById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id))
            return res.status(400).json({ error: "Invalid id" });
        const fav = await favoritemodel_1.Favorite.findByPk(id);
        if (!fav)
            return res.status(404).json({ error: "Not found" });
        res.json(fav);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getFavoriteById = getFavoriteById;
const createFavorite = async (req, res) => {
    try {
        const parsed = favorite_schema_1.favoriteSchema.parse(req.body);
        const created = await favoritemodel_1.Favorite.create(parsed);
        res.status(201).json(created);
    }
    catch (err) {
        if (err?.issues) {
            // Zod validation error
            return res.status(400).json({ error: err.errors ?? err.message, details: err.issues });
        }
        res.status(400).json({ error: err.message });
    }
};
exports.createFavorite = createFavorite;
const updateFavorite = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id))
            return res.status(400).json({ error: "Invalid id" });
        const fav = await favoritemodel_1.Favorite.findByPk(id);
        if (!fav)
            return res.status(404).json({ error: "Not found" });
        const parsed = favorite_schema_1.favoriteSchema.partial().parse(req.body);
        await fav.update(parsed);
        res.json(fav);
    }
    catch (err) {
        if (err?.issues)
            return res.status(400).json({ error: err.errors ?? err.message, details: err.issues });
        res.status(400).json({ error: err.message });
    }
};
exports.updateFavorite = updateFavorite;
const deleteFavorite = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id))
            return res.status(400).json({ error: "Invalid id" });
        const fav = await favoritemodel_1.Favorite.findByPk(id);
        if (!fav)
            return res.status(404).json({ error: "Not found" });
        await fav.destroy();
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteFavorite = deleteFavorite;
