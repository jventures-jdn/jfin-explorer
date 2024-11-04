/* JFIN Mod Start */
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

import PageNextJs from 'nextjs/PageNextJs';

const NetworkProfiles = dynamic(() => import('ui/pages/NetworkProfiles'), { ssr: false });

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/network-profiles">
      <NetworkProfiles/>
    </PageNextJs>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps';

/* JFIN Mod End */
