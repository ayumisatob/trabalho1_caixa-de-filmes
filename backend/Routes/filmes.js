import express from "express";
import {getFilmes, createFilmes, updateFilmes, deleteFilmes} from "../Controllers/filmes.js";

const router = express.Router();
router.get("/", getFilmes);
router.post("/", createFilmes);
router.put("/:id", updateFilmes);
router.delete("/:id", deleteFilmes);
export default router;