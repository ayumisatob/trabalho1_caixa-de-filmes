import express from "express";
import cors from "cors";
import filmeRouters from "./Routes/filmes.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/filmes", filmeRouters)

app.listen(8800);