import { Request, Response, NextFunction } from 'express';
import response from '../helpers/response'; // Custom response helper
import { ADMIN, USER } from '../Models/file.models';

const demoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return response.success({
      res,
      code: 200,
      data: {
        success: true,
        message: 'Request successfully processed',
      },
    });
  } catch (error: any) {
    console.error('Error in demoController:', error.message || error); // Log the error for debugging
    return response.error({
      res,
      code: 500,
      message: 'Internal Server Error',
    });
  }
};

const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, age } = req.body;
    if (!username || !age) {
      return response.error({
        res,
        code: 400,
        message: 'Username and age are required',
      });
    }

    const newUser = await USER.create({ username, age });

    return response.success({
      res,
      code: 201,
      data: {
        success: true,
        message: 'User created successfully',
        user: newUser,
      },
    });
  } catch (error: any) {
    console.error('Error creating user:', error.message || error);
    return response.error({
      res,
      code: 500,
      message: 'Failed to create user',
    });
  }
};
const CreateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return response.error({
      res,
      code: 400,
      message: 'name and age are required',
    });
  }
  try {
    const NewAdmin = await ADMIN.create({ name, age });
    return response.success({
      res,
      code: 201,
      data: {
        message: 'admin created successfully',
        admin: NewAdmin,
      },
    });
  } catch (error: any) {
    return response.error({
      res,
      code: 500,
      message: 'Failed to create user',
    });
  }
};
const getUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const user = (await USER.findByPk(userId))?.dataValues;
    return response.success({
      res,
      code: 200,
      data: {
        message: 'user founded successfully',
        user: user,
      },
    });
  } catch (error: any) {
    return response.error({
      res,
      message: 'user not found',
    });
  }
};
// upload file controller
const uploadfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { demoController, createUserController, CreateAdmin, getUserData };
