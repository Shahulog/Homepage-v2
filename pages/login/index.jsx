import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Container, Box } from "@mui/material";
import { FaGoogle, FaGithub, FaTwitter, FaFacebook, FaLinkedin, FaApple, FaMicrosoft, FaYahoo, FaAmazon, FaDiscord, FaTwitch, FaSpotify, FaReddit, FaPinterest, FaTelegram, FaLine } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  
  const [error, setError] = useState("");
  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: false
      });
      
      if (result?.error) {
        setError("ログインに失敗しました。もう一度お試しください。");
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      setError("予期せぬエラーが発生しました。");
      console.error("Sign in error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          py: 4
        }}
      >
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => {router.push("/login/email")}}
        >
          Sign in With Email
          <MdEmail style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
          <FaGoogle style={{ marginLeft: 10 }} />
        </Button>
       {/**
         //TODO: ここにソーシャルログインのボタンを追加
          
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("github")}
        >
          Sign in with GitHub
          <FaGithub style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("twitter")}
        >
          Sign in with Twitter
          <FaTwitter style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("facebook")}
        >
          Sign in with Facebook
          <FaFacebook style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("linkedin")}
        >
          Sign in with LinkedIn
          <FaLinkedin style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("apple")}
        >
          Sign in with Apple
          <FaApple style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("microsoft")}
        >
          Sign in with Microsoft
          <FaMicrosoft style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("yahoo")}
        >
          Sign in with Yahoo
          <FaYahoo style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("amazon")}
        >
          Sign in with Amazon
          <FaAmazon style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("discord")}
        >
          Sign in with Discord
          <FaDiscord style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("twitch")}
        >
          Sign in with Twitch
          <FaTwitch style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("spotify")}
        >
          Sign in with Spotify
          <FaSpotify style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("reddit")}
        >
          Sign in with Reddit
          <FaReddit style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("tiktok")}
        >
          Sign in with TikTok
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("pinterest")}
        >
          Sign in with Pinterest
          <FaPinterest style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("telegram")}
        >
          Sign in with Telegram
          <FaTelegram style={{ marginLeft: 10 }} />
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("kakao")}
        >
          Sign in with Kakao
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          fullWidth
          onClick={() => signIn("line")}
        >
          Sign in with Line
          <FaLine style={{ marginLeft: 10 }} />
        </Button>
        */}
        
      </Box>
    </Container>
  );
}