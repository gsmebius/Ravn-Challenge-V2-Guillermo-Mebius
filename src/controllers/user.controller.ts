import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { encrypt, compare, tokenSign } from '../utilities/helpers';

const prisma = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roleId, tokenAuth } = req.body;

    const passwordHash = await encrypt(password);
    const tokenAccess = await tokenSign(tokenAuth);

    const registerUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        roleId,
        tokenAuth: tokenAccess
      }
    });

    res.send({
      registerUser
    });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password, tokenAuth } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: { email }
    });

    if (!user) {
      res.status(404).json({
        message: 'sorry, user not found'
      });
    }

    const checkpass = await compare(password, String(user?.password));

    if (!checkpass) {
      res.status(404).json({ msg: 'Incorrect password' });
    }
    if (checkpass) {
      const tokenAcces = await tokenSign(tokenAuth);
      const signInUser = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          tokenAuth: tokenAcces
        }
      });

      res.send({
        signInUser
      });
    }
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const signOut = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        tokenAuth: ''
      }
    });

    res.status(404).json({
        message: 'you are signOut'
      });

  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};
