import express from "express";           
import authUser from "../middlewares/authuser.js";
import { updateCart } from "../controllers/cartControllers.js";

const cartRouter = express.Router();     

cartRouter.post('/update', authUser, updateCart);

export default cartRouter;
