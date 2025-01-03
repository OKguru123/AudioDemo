import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connectionDB'; // Import sequelize instance

export class User extends Model {
  public id!: number;
  public username!: string;
  public age!: number;
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);
