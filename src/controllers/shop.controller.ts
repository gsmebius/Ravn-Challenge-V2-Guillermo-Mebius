import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { productId, userId } = req.body;

    if (!productId || !userId)
      return res.status(400).send({
        message: 'Missing param: id or productId'
      });

    const addProduct = await prisma.cart.create({
      data: {
        productId: Number(productId),
        userId: Number(userId)
      }
    });
    return res.status(200).send({
      message: 'Product added',
      data: addProduct
    });
  } catch (e) {
    return res.status(500).send({ e });
  }
};

export const removeToCart = async (req: Request, res: Response) => {
  try {
    const { productId, userId } = req.body;

    if (!productId || !userId)
      return res.status(400).send({
        message: 'Missing param: id or productId'
      });

    const cart = await prisma.cart.findFirst({
      where: { productId: productId, userId: userId }
    });

    await prisma.cart.delete({
      where: { id: Number(cart?.id) }
    });
    return res.status(200).send({
      message: 'Product deleted'
    });
  } catch (e) {
    return res.status(500).send({ e });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;

    const cartUser = await prisma.cart.findMany({
      where: { userId: Number(shopId) },
      include: { product: true }
    });

    const user = await prisma.user.findFirst({
      where: { id: Number(shopId) },
    });

    const nameUser = user?.name

    res.status(200).send({
      message: 'Order found',
      user: nameUser,
      cartUser
    });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const purchase = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;

    const purchase = await prisma.cart.findFirst({
      where: { userId: Number(shopId) },
      include: { product: true }
    });

    if (!purchase?.productId) {
      return res.status(400).send({
        message: 'Your cart is empty, please add products'
      });
    }
    
    res.status(200).send({
      message: 'your order has been successfully processed'
    });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};
