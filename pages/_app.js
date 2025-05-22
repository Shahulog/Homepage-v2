
import { SessionProvider } from "next-auth/react";
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <SessionProvider 
        session={session}
        refetchInterval={5 * 60} // 5分ごとにセッションを更新
        refetchOnWindowFocus={true} // ウィンドウがフォーカスされたときにセッションを更新
      >
      <Component {...pageProps} />
    </SessionProvider>
  );
}
