import React from 'react';

import type { Props } from './types';

import AppErrorBoundary from 'ui/shared/AppError/AppErrorBoundary';
import Header from 'ui/snippets/header/Header';
import HeaderAlert from 'ui/snippets/header/HeaderAlert';

import * as Layout from './components';

const LayoutHome = ({ children }: Props) => {
  return (
    <Layout.Container>
      <Layout.MainArea>
        <Layout.SideBar/>
        { /* JFIN Mod Start */ }
        <Layout.MainColumn
          paddingTop={{ base: '60px', lg: 9 }}
        >
          <HeaderAlert/>
          <Header isHomePage/>
          <AppErrorBoundary>
            { children }
          </AppErrorBoundary>
        </Layout.MainColumn>
        { /* JFIN Mod End */ }
      </Layout.MainArea>
      <Layout.Footer/>
    </Layout.Container>
  );
};

export default LayoutHome;
