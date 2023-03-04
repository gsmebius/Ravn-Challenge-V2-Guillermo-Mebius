import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findFirst({
      where: { id: Number(userId) }
    });

    const auth = jwt.verify(
      String(user?.tokenAuth),
      String(process.env.JWT_KEY)
    );
    if (auth) {
      next();
    } else {
      res.send({
        message: 'you need sign in first'
      });
    }
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};


export const onlyManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findFirst({
      where: { id: Number(userId) }
    });

    if (user?.roleId == 2) {
      next();
    } else {
      res.send({
        message: 'you need to be a manager'
      });
    }
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};