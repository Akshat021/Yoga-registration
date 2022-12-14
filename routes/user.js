import express from "express";
const Router = express.Router();

import { register, details } from "../controllers/userCountroller.js";

Router.route("/register").post(register);
Router.route("/:id").post(details);

export default Router;
