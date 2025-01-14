import { Sequelize } from 'sequelize';
import { config } from '../config';

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
