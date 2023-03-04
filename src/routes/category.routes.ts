import express from 'express';
import { verifyToken, onlyManager } from '../utilities/middlewares';
import {
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
  createCategory
} from '../controllers/category.controller';

export const categoryRouter = express.Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/:categId', getCategoryById);
categoryRouter.post('/:userId', verifyToken, onlyManager, createCategory);
categoryRouter.put('/:userId/:categId', verifyToken, onlyManager, updateCategory);
categoryRouter.delete('/:userId/:categId', verifyToken, onlyManager, deleteCategory);
