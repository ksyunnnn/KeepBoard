import React from 'react';
import SignInArea from '../container/SignInArea';
import Dialog from './Dialog';

const Layout: React.FCX<{
  title?: string
}> = ({ children }) => (
  <>
    <header className="p-4 flex justify-between">
      <span>
        Keep Board | Google Keepのコピペ特化したサービス
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
