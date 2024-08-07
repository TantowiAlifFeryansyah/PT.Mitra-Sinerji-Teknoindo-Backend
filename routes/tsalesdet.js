import express from "express"
import { getListSalesDet, createSalesDet, searchSalesDet, getSalesDetBySalesId } from "../controller/TsalesDetController.js"

const route = express.Router();
route.get("/sales-det", getListSalesDet);
route.post("/sales-det", createSalesDet);
route.get("/sales-details", getSalesDetBySalesId);
route.get("/search", searchSalesDet);

export default route;