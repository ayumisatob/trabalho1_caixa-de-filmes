import express from "express";
import {getFilmes} from "../Controllers/filmes.js";

const router = express.Router();
router.get("/", getFilmes);
export default router;