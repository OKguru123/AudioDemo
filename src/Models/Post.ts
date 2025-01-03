import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connectionDB'; // Import sequelize instance

export class Post extends Model {
  public id!: number;
  public userId!: number;
  public email!: string;
  public message!: string;
  public role!: string;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Reference the User table
        key: 'id',
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: 'Post',
    tableName: 'posts',
    timestamps: true,
  }
);
