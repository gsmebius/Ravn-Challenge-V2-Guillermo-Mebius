import express from 'express';
import { verifyToken } from '../utilities/middlewares';
import {
    addToCart,
    removeToCart,
    getOrder,
    purchase
} from '../controllers/shop.controller';

export const shopRouter = express.Router();

shopRouter.post('/:userId', verifyToken, addToCart);
shopRouter.delete('/:userId', verifyToken, removeToCart);
shopRouter.get('/:userId/:shopId', verifyToken, getOrder);
shopRouter.post('/:userId/:shopId', verifyToken, purchase);