import express from "express";
import { limiter, signlimiter } from "../limits/limter.js"

import { addFav, createUser, delFav, findFav, getAllUsers, getUser, listFav, login } from "../controllers/user.js";

const Route= express.Router()

Route.use("/create",signlimiter);
Route.use("/login",signlimiter);
Route.route("/create").post(createUser)
Route.route("/login").post(login)

// Route.use(limiter);
Route.route("/:id").get(getUser)
Route.route("/").get(getAllUsers)
Route.route("/recipe:id").patch(addFav).delete(delFav)
Route.route("/findfav").post(findFav)
Route.route("/listfav").post(listFav)
export default Route