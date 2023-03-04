import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { categId } = req.params;
    const category = await prisma.category.findFirst({
      where: { id: Number(categId) },
      include: { products : true }
    });

    if (!category)
      return res.status(404).send({
        message: 'Sorry, category not found'
      });

    return res.status(200).send({ category });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
        include: { products : true }
    });

    return res.status(200).send({ categories });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    await prisma.category.create({
      data: { name }
    });

    res.status(200).send({
      message: 'Category created successfully',
      newCategory: { name }
    });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categId } = req.params;
    const { name } = req.body;

    if (name) req.body.name = name;

    const categoryUpdate = await prisma.category.update({
      where: { id: Number(categId) },
      data: { name }
    });

    res.status(200).send({
      message: 'category updated successfully',
      updateCategory: categoryUpdate
    });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categId } = req.params;

    await prisma.category.delete({
      where: { id: Number(categId) }
    });

    res.status(200).send({
      message: 'category deleted successfully'
    });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};