import { NextFunction, Request, Response } from 'express';
import Emailservices from '../helpers/email';
import response from '../helpers/response';
import UserRegi from '../Models/UserRegister';

const sendEmailOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    // Validate email input
    if (!email) {
      return response.error({
        res,
        code: 400,
        message: 'Email is required.',
      });
    }
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 60 * 1000);
    const datauser = await sendEmail(email, otp);
    if (datauser) {
      const user = await UserRegi.create({
        email,
        otp,
        otpExpiresAt,
        login: false,
      });
      return response.success({
        res,
        code: 201,
        data: {
          success: true,
          message: 'OTP sent successfully to the email.',
          user,
        },
      });
    } else {
      return response.error({
        res,
        code: 500,
        message: 'Failed to send OTP. Please try again later.',
      });
    }
  } catch (error: any) {
    console.error('Error in sendEmailOTP:', error.message || error);
    return response.error({
      res,
      code: 500,
      message: 'An error occurred while sending OTP.',
    });
  }
};

const sendEmail = async (email: string, otp: string): Promise<boolean> => {
  const emailPayload = {
    receiver: email,
    subject: 'OTP Audio Summary',
    text: 'Hello, this is your OTP for sign-in.' + `${otp}`,
  };

  try {
    const isEmailSent = await Emailservices.sendEmail(emailPayload);
    if (isEmailSent) {
      console.log('Email sent successfully!');
      return true;
    } else {
      console.log('Failed to send email.');
      return false;
    }
  } catch (error: any) {
    console.error(
      'An error occurred while sending the email:',
      error.message || error
    );
    return false;
  }
};

function generateOTP(length: number = 6): string {
  const characters = '0123456789'; // Using digits for OTP
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }

  return otp;
}
export { sendEmailOTP };
