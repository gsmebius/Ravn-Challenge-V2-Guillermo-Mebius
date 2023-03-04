import express from 'express';
import { verifyToken, onlyManager } from '../utilities/middlewares';
import {
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct
} from '../controllers/product.controller';

export const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProductById);
productRouter.post('/:userId', verifyToken, onlyManager, createProduct);
productRouter.put('/:userId/:productId', verifyToken, onlyManager, updateProduct);
productRouter.delete('/:userId/:productId', verifyToken, onlyManager, deleteProduct);