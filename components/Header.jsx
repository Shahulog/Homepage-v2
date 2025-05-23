'use client'
import { AppBar, Toolbar, Typography, Button, Box, Link } from '@mui/material';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from "next-auth/react"
import LoginoutButton from './LoginoutButton';
const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();



  return (
    <AppBar 
      position="static"
      sx={{
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
      <Link href="/" style={{ textDecoration: 'none', flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              color: '#333333',
              '&:hover': {
                color: '#666666', // ホバー時の色を少し薄く
                transition: 'color 0.2s ease-in-out'
              }
            }}
          >
            Shahulog
          </Typography>
        </Link>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Link href="/" underline="hover" color="inherit" sx={{ color: '#333333' }}>
            ホーム
          </Link>
          <Link href="/contact" underline="hover" color="inherit" sx={{ color: '#333333' }}>
            お問い合わせ
          </Link>
          {session?.user ? (
            <>
              <Typography variant="body1" color="inherit" sx={{ color: '#333333' }}>{session?.user?.name || "名無し"}さん</Typography>
              <LoginoutButton />
            </>
          ) : (
            <>
              <LoginoutButton />
              
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;