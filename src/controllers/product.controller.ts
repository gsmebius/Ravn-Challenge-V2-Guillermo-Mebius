import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await prisma.product.findFirst({
      where: { id: Number(productId) },
      include: { category : true }
    });

    if (!product)
      return res.status(404).send({
        message: 'Sorry, category not found'
      });

    return res.status(200).send({ product });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const produtcs = await prisma.product.findMany({
        include: { category : true }
    });

    return res.status(200).send({ produtcs });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, urlImage, categoryId } = req.body;
    await prisma.product.create({
      data: { name, 
        price, 
        stock, 
        urlImage, 
        categoryId }
    });

    res.status(200).send({
      message: 'Product created successfully',
      newProduct: { name, price, stock, urlImage, categoryId }
    });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { name, price, stock, urlImage, categoryId } = req.body;

    if (name) req.body.name = name;
    if (price) req.body.price = price;
    if (stock) req.body.stock = stock;
    if (urlImage) req.body.urlImage = urlImage;
    if (categoryId) req.body.categoryId = categoryId;

    const productUpdate = await prisma.product.update({
      where: { id: Number(productId) },
      data: { name, price, stock, urlImage, categoryId }
    });

    res.status(200).send({
      message: 'product updated successfully',
      newProduct: productUpdate
    });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    await prisma.product.delete({
      where: { id: Number(productId) }
    });

    res.status(200).send({
      message: 'product deleted successfully'
    });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};