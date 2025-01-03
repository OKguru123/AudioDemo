import { Request, Response } from 'express';
import { Post } from '../Models/Post';
import { User } from '../Models/User';
// Import the models from index.ts

// Create a new post for a user
export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, email, message, role } = req.body; // Get post data from request body

    if (!userId || !email) {
      return res.status(400).json({ error: 'User ID and email are required' });
    }

    // Create a new post
    const newPost = await Post.create({
      userId,
      email,
      message,
      role,
    });

    return res
      .status(201)
      .json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get posts by a specific user
export const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    console.log(userId, 'userId');

    const posts = await Post.findAll({
      where: { userId },
      //   include: {
      //     model: User,
      //     as: 'user',
      //   },
    });

    return res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ error: 'Internal server error show' });
  }
};
