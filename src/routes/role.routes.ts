import express from 'express';
import { verifyToken, onlyManager } from '../utilities/middlewares';
import {
  getRoleById,
  getRoles,
  updateRole,
  deleteRole,
  createRole
} from '../controllers/role.controller';

export const roleRouter = express.Router();

roleRouter.get('/:userId', verifyToken, onlyManager, getRoles);
roleRouter.get('/:userId/:roleId', verifyToken, onlyManager, getRoleById);
roleRouter.post('/:userId', verifyToken, onlyManager, createRole);
roleRouter.put('/:userId/:roleId', verifyToken, onlyManager, updateRole);
roleRouter.delete('/:userId/:roleId', verifyToken, onlyManager, deleteRole);