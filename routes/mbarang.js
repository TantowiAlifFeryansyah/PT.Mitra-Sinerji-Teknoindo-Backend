import express from "express"
import { createBarang, getListBarang } from "../controller/MbarangController.js"

const route = express.Router();
route.get("/barang", getListBarang);
route.post("/barang", createBarang);

export default route;