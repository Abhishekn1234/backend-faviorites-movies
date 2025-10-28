import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface FavoriteAttributes {
  id: number;
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget?: string | null;
  location?: string | null;
  duration?: string | null;
  year?: string | null;
  posterUrl?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type FavoriteCreationAttributes = Optional<FavoriteAttributes, "id" | "budget" | "location" | "duration" | "year" | "posterUrl">;

export class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> implements FavoriteAttributes {
  public id!: number;
  public title!: string;
  public type!: "Movie" | "TV Show";
  public director!: string;
  public budget?: string | null;
  public location?: string | null;
  public duration?: string | null;
  public year?: string | null;
  public posterUrl?: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Favorite.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    type: { type: DataTypes.ENUM("Movie", "TV Show"), allowNull: false },
    director: { type: DataTypes.STRING(255), allowNull: false },
    budget: { type: DataTypes.STRING(100), allowNull: true },
    location: { type: DataTypes.STRING(255), allowNull: true },
    duration: { type: DataTypes.STRING(50), allowNull: true },
    year: { type: DataTypes.STRING(50), allowNull: true },
    posterUrl: { type: DataTypes.STRING(2048), allowNull: true }
  },
  {
    sequelize,
    tableName: "favorites",
    timestamps: true
  }
);
