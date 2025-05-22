import clientPromise from '../pages/api/mongodb';

export async function createOTP(email) {
  const client = await clientPromise;
  const db = client.db();
  
  // 古いOTPを削除
  await db.collection('otps').deleteMany({ email });
  
  // 新しいOTPを生成
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10分後
  
  // OTPを保存
  await db.collection('otps').insertOne({
    email,
    otp,
    expiryTime,
    createdAt: new Date(),
    attempts: 0
  });
  
  return otp;
}

export async function verifyOTP(email, otp) {
  const client = await clientPromise;
  const db = client.db();
  
  const otpRecord = await db.collection('otps').findOne({ email });
  
  if (!otpRecord) {
    return { valid: false, message: 'OTPが見つかりません' };
  }
  
  if (otpRecord.attempts >= 3) {
    return { valid: false, message: '試行回数が上限に達しました' };
  }
  
  if (new Date() > otpRecord.expiryTime) {
    return { valid: false, message: 'OTPの有効期限が切れています' };
  }
  
  if (otpRecord.otp !== otp) {
    // 試行回数を増やす
    await db.collection('otps').updateOne(
      { email },
      { $inc: { attempts: 1 } }
    );
    return { valid: false, message: '無効なOTPです' };
  }
  
  // 成功したらOTPを削除
  await db.collection('otps').deleteOne({ email });
  
  return { valid: true, message: '認証成功' };
}