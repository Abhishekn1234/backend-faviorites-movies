import { Request, Response } from "express";
import { Favorite } from "../models/favoritemodel";
import { favoriteSchema } from "../validation/favorite.schema";
import { Op } from "sequelize";

/**
 * GET /api/favorites?offset=0&limit=20&search=...&type=Movie
 * returns { total, items }
 */
export const getFavorites = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const offset = Number(req.query.offset) || 0;

    const where: any = {};
    // optional search (title, director)
    if (req.query.search) {
      const q = String(req.query.search);
      where[Op.or] = [
        { title: { [Op.like]: `%${q}%` } },
        { director: { [Op.like]: `%${q}%` } }
      ];
    }
    if (req.query.type) {
      where.type = req.query.type;
    }

    const { count, rows } = await Favorite.findAndCountAll({
      where,
      order: [["id", "DESC"]],
      limit,
      offset
    });

    res.json({ total: count, items: rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getFavoriteById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const fav = await Favorite.findByPk(id);
    if (!fav) return res.status(404).json({ error: "Not found" });
    res.json(fav);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createFavorite = async (req: Request, res: Response) => {
  try {
    const parsed = favoriteSchema.parse(req.body);
    const created = await Favorite.create(parsed as any);
    res.status(201).json(created);
  } catch (err: any) {
    if (err?.issues) {
      // Zod validation error
      return res.status(400).json({ error: err.errors ?? err.message, details: err.issues });
    }
    res.status(400).json({ error: err.message });
  }
};

export const updateFavorite = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const fav = await Favorite.findByPk(id);
    if (!fav) return res.status(404).json({ error: "Not found" });

    const parsed = favoriteSchema.partial().parse(req.body);
    await fav.update(parsed as any);
    res.json(fav);
  } catch (err: any) {
    if (err?.issues) return res.status(400).json({ error: err.errors ?? err.message, details: err.issues });
    res.status(400).json({ error: err.message });
  }
};

export const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const fav = await Favorite.findByPk(id);
    if (!fav) return res.status(404).json({ error: "Not found" });
    await fav.destroy();
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
