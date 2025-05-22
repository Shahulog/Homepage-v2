import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function OTPVerification({ email }) {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('認証成功');
        router.push('/dashboard'); // 認証成功後のリダイレクト先
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('認証に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage('新しい認証コードを送信しました');
      } else {
        setMessage('認証コードの送信に失敗しました');
      }
    } catch (error) {
      setMessage('認証コードの送信に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">認証コードを入力</h2>
      <p className="mb-4">{email} に送信された認証コードを入力してください</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="認証コードを入力"
            maxLength={6}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? '認証中...' : '認証'}
          </button>
          
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={loading}
            className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 disabled:bg-gray-400"
          >
            再送信
          </button>
        </div>
      </form>

      {message && (
        <p className={`mt-4 p-2 rounded ${
          message.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}