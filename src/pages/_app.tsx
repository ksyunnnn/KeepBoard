import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { getAnalytics } from '../lib/firebase';

const App = ({ Component, pageProps }: AppProps) => {
  // [TODO] N でだしたい
  // const handleN = (e: KeyboardEvent) => {
  //   if (e.keyCode === 78) {
  //     console.log('N Click');
  //   }
  // };

  useEffect(() => {
    getAnalytics();

    // document.addEventListener('keydown', handleN);
    // return () => {
    //   document.removeEventListener('keydown', handleN);
    // };
  }, []);
  return (
    <RecoilRoot>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_SITE_DESC} />
        <link rel="icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@ksyunnnn" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
        <meta property="og:title" content={process.env.NEXT_PUBLIC_SITE_NAME} />
        <meta property="og:description" content={process.env.NEXT_PUBLIC_SITE_DESC} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/OGP.png`} />
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};
export default App;
