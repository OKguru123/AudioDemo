import nodemailer from 'nodemailer';
import logger from './logger';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Transporter from 'nodemailer/lib/mailer/index';
import { config } from '../config/';

export type SendEmailPayload = {
  receiver: string;
  subject: string;
  text?: string;
  html?: string;
};

async function sendEmail(data: SendEmailPayload): Promise<boolean> {
  let isEmailSent = true;
  let transporter: Transporter<SMTPTransport.SentMessageInfo>;

  try {
    if (!data.text && !data.html) {
      return false;
    }

    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',

      port: 587,
      secure: false,
      auth: {
        user: 'prashant.jain@hiteshi.com',
        pass: 'qkjl zhjb kkgl zllq',
        // qkjl zhjb kkgl zllq
      },
    });

    await transporter.sendMail({
      from: `${'prashant jain'} <${'prashant.jain@hiteshi.com'}>`,
      to: data.receiver,
      subject: data.subject,
      html: data.html,
      text: data.text,
    });
  } catch (error) {
    logger.error(error);
    isEmailSent = false;
  } finally {
    // @ts-ignore
    if (transporter !== undefined) {
      transporter.close();
    }
  }
  return isEmailSent;
}

export default { sendEmail };
