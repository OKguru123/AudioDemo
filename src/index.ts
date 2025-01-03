import express from 'express';
import { config } from './config/index';

import { logger } from './helpers';
import sequelize from './db/connectionDB';
import cors from 'cors';
import sendEmailService from './helpers/email';

import { registerMiddlewares, registerRoutes } from './middlewares';

Promise.all([]).then(bootstrapServer).catch(handleServerInitError);

function bootstrapServer() {
  const app = express();

  app.use(
    cors({
      origin: '*',
    })
  );

  registerMiddlewares(app);
  registerRoutes(app);

  const PORT = config.PORT;

  sequelize
    .sync({ alter: true }) // Set force: true to drop and recreate tables set alter to modify the current table

    .then(() => {
      console.log('Database connected successfully');
    })
    .catch((error: Error) => {
      console.error('Error syncing database:', error);
    });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  // main();
}

function handleServerInitError(e: unknown) {
  logger.error('Error initializing server:', e);
}

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
});
async function main() {
  const otp = generateOTP();

  const emailPayload = {
    receiver: 'prashantofficial.jain789@gmail.com', // Replace with the recipient's email
    subject: 'OTP Audio Sunmmary',
    text: 'Hello, this Otp for signin' + ` OTP: ${otp}`,
    // html: '<p>Hello, this is an <b>HTML</b> email.</p>', // Optional: Use HTML content
  };

  try {
    // Call the sendEmail function
    const isEmailSent = await sendEmailService.sendEmail(emailPayload);

    if (isEmailSent) {
      console.log('Email sent successfully!');
    } else {
      console.log('Failed to send email.');
    }
  } catch (error) {
    console.error('An error occurred while sending the email:', error);
  }
}

// Function to generate a random OTP of a specified length
function generateOTP(length: number = 6): string {
  const characters = '0123456789'; // Using digits for OTP
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }

  return otp;
}
