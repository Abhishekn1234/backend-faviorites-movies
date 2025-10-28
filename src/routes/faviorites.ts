import { Router } from "express";
import {
  getFavorites,
  getFavoriteById,
  createFavorite,
  updateFavorite,
  deleteFavorite
} from "../controllers/favoritecontroller";

const router = Router();

router.get("/", getFavorites);
router.get("/:id", getFavoriteById);
router.post("/", createFavorite);
router.put("/:id", updateFavorite);
router.delete("/:id", deleteFavorite);

export default router;
