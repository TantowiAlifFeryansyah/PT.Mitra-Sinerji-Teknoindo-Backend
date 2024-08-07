import express from "express"
import { createCustomer, getListCustomer } from "../controller/McustomerController.js"

const route = express.Router();
route.get("/customer", getListCustomer);
route.post("/customer", createCustomer);

export default route;