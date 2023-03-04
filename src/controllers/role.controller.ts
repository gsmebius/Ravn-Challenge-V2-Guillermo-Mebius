import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const { roleId } = req.params;
    const role = await prisma.role.findFirst({
      where: { id: Number(roleId) },
      include: { user : true }
    });

    if (!role)
      return res.status(404).send({
        message: 'Sorry, role not found'
      });

    return res.status(200).send({ role });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany({
        include: { user : true }
    });

    return res.status(200).send({ roles });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    await prisma.role.create({
      data: { name }
    });

    res.status(200).send({
      message: 'Role created successfully',
      newRole: { name }
    });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { roleId } = req.params;
    const { name } = req.body;

    if (name) req.body.name = name;

    const roleUpdate = await prisma.role.update({
      where: { id: Number(roleId) },
      data: { name }
    });

    res.status(200).send({
      message: 'category updated successfully',
      updateRole: roleUpdate
    });
  } catch (e) {
    return res.status(500).send({
      message: 'ups, server error',
      error: e
    });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { roleId } = req.params;

    await prisma.role.delete({
      where: { id: Number(roleId) }
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