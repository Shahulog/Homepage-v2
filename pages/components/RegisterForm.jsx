'use client'
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccess("登録が完了しました！");
          // 登録成功後、自動的にログイン
          return signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
          });
        } else {
          throw new Error(data.message || "登録に失敗しました。");
        }
      })
      .then((signInResult) => {
        if (signInResult?.error) {
          throw new Error("ログインに失敗しました。");
        }
        
      })
      .catch((err) => {
        setError(err.message || "予期せぬエラーが発生しました。");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          新規登録
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="メールアドレス"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              autoComplete="email"
            />

            <TextField
              label="ユーザー名"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              fullWidth
              autoComplete="username"
            />

            <TextField
              label="パスワード"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              autoComplete="new-password"
              inputProps={{ minLength: 8 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                mt: 2,
                height: 48,
                backgroundColor: '#333333',
                '&:hover': {
                  backgroundColor: '#666666',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                '登録する'
              )}
            </Button>

            <Button
              variant="text"
              fullWidth
              onClick={() => router.push('/login')}
              sx={{ mt: 1 }}
            >
              すでにアカウントをお持ちの方はこちら
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}