import React from 'react';

import { GlobalStyle } from '~/components/style/global-style';
import { useServiceWorker } from '~/hooks/use-service-worker';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useServiceWorker();

  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};

export default Layout;
