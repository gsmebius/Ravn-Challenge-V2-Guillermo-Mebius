import express from 'express';
import {
    signIn,
    signUp,
    signOut
} from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.post('/:id', signIn);
userRouter.post('/', signUp);
userRouter.post('/out/:id', signOut);