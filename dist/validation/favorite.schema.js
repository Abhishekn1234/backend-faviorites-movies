"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteSchema = void 0;
const zod_1 = require("zod");
exports.favoriteSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    type: zod_1.z.enum(["Movie", "TV Show"]),
    director: zod_1.z.string().min(1, "Director is required"),
    budget: zod_1.z.string().optional().nullable(),
    location: zod_1.z.string().optional().nullable(),
    duration: zod_1.z.string().optional().nullable(),
    year: zod_1.z.string().optional().nullable(),
    posterUrl: zod_1.z.string().url().optional().nullable()
});
