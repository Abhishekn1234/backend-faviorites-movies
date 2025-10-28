import sequelize  from "../config/database";
import { Favorite } from "./favoritemodel";

export { sequelize, Favorite };

// optional helper to sync/pass options
export const syncDB = async (opts: { force?: boolean; alter?: boolean } = { alter: true }) => {
  await sequelize.sync(opts);
};
