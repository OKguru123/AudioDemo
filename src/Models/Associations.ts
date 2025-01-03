import { User } from './User';
import { Post } from './Post';

// Define associations between models

// One User can have many Posts
User.hasMany(Post, {
  foreignKey: 'userId', // Foreign key in Post model
  as: 'posts', // Alias for the relationship
});

// Each Post belongs to one User
Post.belongsTo(User, {
  foreignKey: 'userId', // Foreign key in Post model
  as: 'user', // Alias for the relationship
});
