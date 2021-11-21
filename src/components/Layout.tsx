import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import SignInArea from '../container/SignInArea';
import Dialog from './Dialog';
import Link from './Link';

const Layout: React.FCX<{
  title?: string
}> = ({ children }) => (
  <>
    <header className="p-4 flex justify-between">
      <Link href="/" className="no-underline">
        Keep Board
        <span className="md:inline hidden"> | Google Keepのコピペ特化したサービス</span>
      </Link>
      <div className="flex items-center gap-8">
        <a
          href="https://github.com/ksyunnnn/KeepBoard/issues"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center text-sm"
        >
          Issues
          {' '}
          <ExternalLinkIcon className="h-4 w-4" />
        </a>
        <SignInArea />
      </div>
    </header>
    <main className="min-h-1/4 pb-32">
      <div className="container">{children}</div>
    </main>
    <Dialog />
  </>
);

export default Layout;
