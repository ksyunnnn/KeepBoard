import React from 'react';
import Image from 'next/image';
import SignInArea from '../container/SignInArea';
import Dialog from './Dialog';

const Layout: React.FCX<{
  title?: string
}> = ({ children }) => (
  <>
    <header className="p-4 flex justify-between">
      <span>
        <Image
          src="/LogoTypo.svg"
          objectFit="contain"
          height="20"
          width="148"
        />
      </span>
      <SignInArea />
    </header>
    <main className="min-h-1/4 pb-32">
      <div className="container">{children}</div>
    </main>
    <Dialog />
  </>
);

export default Layout;
