import sequelize  from "../config/database";
import { Favorite } from "./favoritemodel";

export { sequelize, Favorite };

export const syncDB = async (opts: { force?: boolean; alter?: boolean } = { alter: true }) => {
  await sequelize.sync(opts);
};
