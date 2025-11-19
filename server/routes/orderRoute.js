import express from 'express';
import {getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/orderControllers.js';
import authSeller from '../middlewares/authSeller.js';
import authUser from '../middlewares/authuser.js';
import { placeOrderStripe } from '../controllers/orderControllers.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.get('/seller', authSeller, getAllOrders)
orderRouter.post('/stripe', authUser, placeOrderStripe)

export default orderRouter;