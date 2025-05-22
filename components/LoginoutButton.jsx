import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@mui/material"
import { useRouter } from "next/router";
export default function LoginoutButton() {
  const { data: session, status } = useSession()
  const router = useRouter();

  // セッションの状態が読み込み中の場合は何も表示しない
  if (status === "loading") {
    return null;
  }

  if (session) {
    return (
      <>
      
        <Button variant="outlined" color="secondary" onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }
  return (
    <>
      <Button variant="outlined" color="primary" onClick={() => router.push("/login")}>Sign in</Button>
    </>
  )
}