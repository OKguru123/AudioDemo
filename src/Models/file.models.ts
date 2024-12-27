import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connectionDB';
const USER = sequelize.define(
  'USER',
  {
    username: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    nickname: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

const ADMIN = sequelize.define(
  'ADMIN',
  {
    name: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

const File = sequelize.define(
  'File',
  {
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summariesText: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
    },
    speakers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: true }
);
export { USER, ADMIN, File };
