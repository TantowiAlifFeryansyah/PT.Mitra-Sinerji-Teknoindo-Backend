import express from "express"
import { getListUsers, register, login } from "../controller/UsersController.js"

const route = express.Router();
route.get("/users", getListUsers);
route.post("/register", register);
route.post("/login", login);

export default route;