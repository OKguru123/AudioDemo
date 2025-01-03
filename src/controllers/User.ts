import { Request, Response } from 'express'; // Import the models from index.ts
import { User } from '../Models/User';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, age } = req.body; // Get username and age from request body

    if (!username || !age) {
      return res.status(400).json({ error: 'Username and age are required' });
    }

    // Create a new user
    const newUser = await User.create({
      username,
      age,
    });

    return res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all users
export const getUsersall = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
