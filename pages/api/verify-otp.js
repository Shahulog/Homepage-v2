import { verifyOTP } from '../../lib/otp';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { otp, email } = req.body;
    
    const result = await verifyOTP(email, otp);
    
    if (result.valid) {
      // セッションを更新
      const session = await getSession({ req });
      if (session) {
        session.user.verified = true;
        await session.save();
      }
      
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error('OTP検証エラー:', error);
    return res.status(500).json({ message: '認証に失敗しました' });
  }
}