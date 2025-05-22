import { createOTP } from './otp';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    
    // OTPを生成して保存
    const otp = await createOTP(email);
    
    // メールを送信
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: '認証コード',
      text: `あなたの認証コードは ${otp} です。このコードは10分間有効です。`,
      html: `
        <h2>認証コード</h2>
        <p>あなたの認証コードは <strong>${otp}</strong> です。</p>
        <p>このコードは10分間有効です。</p>
      `,
    });

    return res.status(200).json({ message: '認証コードを送信しました' });
  } catch (error) {
    console.error('OTP送信エラー:', error);
    return res.status(500).json({ message: '認証コードの送信に失敗しました' });
  }
}