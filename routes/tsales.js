import express from "express"
import { getListSales, createSales } from "../controller/TsalesController.js"

const route = express.Router();
route.get("/sales", getListSales);
route.post("/sales", createSales);

export default route;