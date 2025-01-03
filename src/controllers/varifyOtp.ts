import { NextFunction, Request, Response } from 'express';
import UserRegi from '../Models/UserRegister';
import { any } from 'zod';
import response from '../helpers/response';

const varifyOTP = async (req: Request, res: Response, next: NextFunction) => {
  const { id, otp } = req.body;

  try {
    const otpdb = (await UserRegi.findByPk(id))?.dataValues;
    const user = await UserRegi.findByPk(id);

    if (user?.isOtpExpired()) {
      return res
        .status(400)
        .json({ success: false, message: 'OTP has expired' });
    }

    if (otpdb?.otp === otp) {
      await UserRegi.update(
        {
          login: true,
        },
        { where: { id: id } }
      );
      await user?.save();

      return response.success({
        res,
        code: 201,
        data: {
          message: 'user logged in successfully ',
          data: user,
        },
      });
    } else {
      return response.error({
        res,
        code: 500,
        data: {
          message: 'user logged in failed ',
          data: otpdb,
        },
      });
    }
  } catch (error) {
    return response.error({
      res,
      code: 500,
      data: {
        message: 'user logged in failed ',
      },
    });
  }
};
export { varifyOTP };
