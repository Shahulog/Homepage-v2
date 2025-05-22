// components/Footer.js
import { Box, Typography, Link, IconButton } from '@mui/material';
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 4, py: 3, px: 2, bgcolor: 'grey.100' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        {new Date().getFullYear()} Shahulog. All rights reserved.
      </Typography>
      <Box display="flex" justifyContent="center" mt={1}>
      <IconButton component="a" href="https://www.youtube.com/@Shahu_log_Channel" target="_blank">
          <FaYoutube />
        </IconButton>
        <IconButton component="a" href="https://x.com/Shahu_log" target="_blank">
          <FaTwitter />
        </IconButton>
        <IconButton component="a" href="https://github.com/Shahulog" target="_blank">
          <FaGithub />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center" mt={1}>
        <Link href="/PrivacyPolicy" underline="hover" sx={{ mx: 1 }}>
          プライバシーポリシー
        </Link>
        <Link href="/terms" underline="hover" sx={{ mx: 1 }}>
          利用規約
        </Link>
        <Link href="/" underline="hover" sx={{ mx: 1 }}>
          お問い合わせ
        </Link>
      </Box>
    </Box>
  );
}
