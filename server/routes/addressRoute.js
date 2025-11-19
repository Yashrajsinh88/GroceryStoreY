import express from 'express';
import authUser from '../middlewares/authuser.js';
import { addAddress, getAddress } from '../controllers/addresControllers.js';
const addressRouter = express.Router();

addressRouter.post('/add',authUser, addAddress) ;
addressRouter.get('/get' , authUser, getAddress ) ;

export default addressRouter