import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connectionDB'; // Adjust the path to your database configuration
import { AllowNull } from 'sequelize-typescript';

// Define the interface for the model attributes
interface UserAttributes {
  id?: number;
  email: string;
  otp: string;
  login: boolean;
  otpExpiresAt: Date;
}

// Define the Sequelize model for the User
class UserRegi extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public otp!: string;
  public login!: boolean;
  public otpExpiresAt!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public isOtpExpired(): boolean {
    return new Date() > this.otpExpiresAt;
  }
}

// Initialize the model
UserRegi.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        isEmail: true, // Ensures the email is in a valid format
      },
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    otpExpiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: 'UserRegi', // Model name
    tableName: 'UserRegi', // Optional: Specify table name
    timestamps: true, // Automatically handle `createdAt` and `updatedAt`
  }
);

export default UserRegi;
