/* JFIN Mod Start */
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

import PageNextJs from 'nextjs/PageNextJs';

const NetworkProfile = dynamic(() => import('ui/pages/NetworkProfile'), { ssr: false });

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/tokens">
      <NetworkProfile/>
    </PageNextJs>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps';

/* JFIN Mod End */
