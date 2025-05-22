import nodemailer from 'nodemailer';

// メール送信用のトランスポーター設定
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/**
 * メール送信のAPIエンドポイント
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;
    console.dir(name, { depth: null });
    
    // メールの内容を設定
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // 自分のメールアドレスに送信
      replyTo: email, // 返信先を送信者のメールアドレスに設定
      subject: `[お問い合わせ] ${subject}`,
      text: `
お名前: ${name}
メールアドレス: ${email}
件名: ${subject}

本文:
${message}
      `,
      html: `
        <h2>お問い合わせ内容</h2>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>件名:</strong> ${subject}</p>
        <h3>本文:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // メールを送信
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'メールの送信に成功しました' });
  } catch (error) {
    console.error('メール送信エラー:', error);
    return res.status(500).json({ message: 'メールの送信に失敗しました' });
  }
}