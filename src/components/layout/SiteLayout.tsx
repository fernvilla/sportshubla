import React, { FC } from 'react';
import SiteHeader from './SiteHeader';

const SiteLayout: FC = ({ children }) => {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
    </>
  );
};

export default SiteLayout;
