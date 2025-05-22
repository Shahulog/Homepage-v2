import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";

import LoginoutButton from "./components/LoginoutButton";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
export default function Home() {
  const {data: session} = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      console.log(session);
    }
  }, [session]);
  return (
    <div>
      <Header />
      <ContactForm />
      <Footer />
    </div>
  );
}
