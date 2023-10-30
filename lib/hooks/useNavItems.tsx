import NetworkAddToJFinWallet from 'customUI/NetworkAddToJFinWallet';
import { useRouter } from 'next/router';
import React from 'react';

import type { NavItemInternal, NavItem, NavGroupItem } from 'types/client/navigation-items';

import config from 'configs/app';
import abiIcon from 'icons/ABI.svg';
import apiKeysIcon from 'icons/API.svg';
import appsIcon from 'icons/apps.svg';
import withdrawalsIcon from 'icons/arrows/north-east.svg';
import depositsIcon from 'icons/arrows/south-east.svg';
import blocksIcon from 'icons/block.svg';
import contractIcon from 'icons/contract.svg';
import discussionsIcon from 'icons/discussions.svg';
import docsIcon from 'icons/docs.svg';
import gearIcon from 'icons/gear.svg';
import globeIcon from 'icons/globe-b.svg';
import graphQLIcon from 'icons/graphQL.svg';
import linkIcon from 'icons/link.svg';
import outputRootsIcon from 'icons/output_roots.svg';
import privateTagIcon from 'icons/privattags.svg';
import publicTagIcon from 'icons/publictags.svg';
import apiDocsIcon from 'icons/restAPI.svg';
import rpcIcon from 'icons/RPC.svg';
import statsIcon from 'icons/stats.svg';
import testnetIcon from 'icons/testnet.svg';
import tokensIcon from 'icons/token.svg';
import topAccountsIcon from 'icons/top-accounts.svg';
import transactionsIcon from 'icons/transactions.svg';
import txnBatchIcon from 'icons/txn_batches.svg';
import verifiedIcon from 'icons/verified.svg';
import walletIcon from 'icons/wallet.svg';
import metamaskIcon from 'icons/wallets/metamask.svg';
import watchlistIcon from 'icons/watchlist.svg';
import { rightLineArrow } from 'lib/html-entities';
import UserAvatar from 'ui/shared/UserAvatar';

interface ReturnType {
  mainNavItems: Array<NavItem | NavGroupItem>;
  accountNavItems: Array<NavItem>;
  profileItem: NavItem;
}

export function isGroupItem(item: NavItem | NavGroupItem): item is NavGroupItem {
  return 'subItems' in item;
}

export function isInternalItem(item: NavItem): item is NavItemInternal {
  return 'nextRoute' in item;
}

export default function useNavItems(): ReturnType {
  const router = useRouter();
  const pathname = router.pathname;

  return React.useMemo(() => {
    let blockchainNavItems: Array<NavItem> | Array<Array<NavItem>> = [];

    const topAccounts = !config.UI.views.address.hiddenViews?.top_accounts ? {
      text: 'Top accounts',
      nextRoute: { pathname: '/accounts' as const },
      icon: topAccountsIcon,
      isActive: pathname === '/accounts',
    } : null;
    const blocks = {
      text: 'Blocks',
      nextRoute: { pathname: '/blocks' as const },
      icon: blocksIcon,
      isActive: pathname === '/blocks' || pathname === '/block/[height_or_hash]',
    };
    const txs = {
      text: 'Transactions',
      nextRoute: { pathname: '/txs' as const },
      icon: transactionsIcon,
      isActive: pathname === '/txs' || pathname === '/tx/[hash]',
    };
    const verifiedContracts =
    // eslint-disable-next-line max-len
     { text: 'Verified contracts', nextRoute: { pathname: '/verified-contracts' as const }, icon: verifiedIcon, isActive: pathname === '/verified-contracts' };

    if (config.features.rollup.isEnabled) {
      blockchainNavItems = [
        [
          txs,
          // eslint-disable-next-line max-len
          { text: `Deposits (L1${ rightLineArrow }L2)`, nextRoute: { pathname: '/l2-deposits' as const }, icon: depositsIcon, isActive: pathname === '/l2-deposits' },
          // eslint-disable-next-line max-len
          { text: `Withdrawals (L2${ rightLineArrow }L1)`, nextRoute: { pathname: '/l2-withdrawals' as const }, icon: withdrawalsIcon, isActive: pathname === '/l2-withdrawals' },
        ],
        [
          blocks,
          // eslint-disable-next-line max-len
          { text: 'Txn batches', nextRoute: { pathname: '/l2-txn-batches' as const }, icon: txnBatchIcon, isActive: pathname === '/l2-txn-batches' },
          // eslint-disable-next-line max-len
          { text: 'Output roots', nextRoute: { pathname: '/l2-output-roots' as const }, icon: outputRootsIcon, isActive: pathname === '/l2-output-roots' },
        ],
        [
          topAccounts,
          verifiedContracts,
        ].filter(Boolean),
      ];
    } else {
      blockchainNavItems = [
        txs,
        blocks,
        topAccounts,
        verifiedContracts,
        config.features.beaconChain.isEnabled && {
          text: 'Withdrawals',
          nextRoute: { pathname: '/withdrawals' as const },
          icon: withdrawalsIcon,
          isActive: pathname === '/withdrawals',
        },
      ].filter(Boolean);
    }

    /* JFIN Mod Start */
    const informationNavItems: Array<NavItem> = [
      {
        text: 'JFIN Chain',
        icon: globeIcon,
        url: 'https://www.jfincoin.io/about-jfin-chain',
      },
      {
        text: 'JFIN Community',
        icon: discussionsIcon,
        url: 'https://www.jfincoin.io/jfin-community',
      },
      {
        text: 'JFIN Whitepaper',
        icon: contractIcon,
        url: 'https://www.jfincoin.io/whitepaper',
      },
    ].filter(Boolean);

    /* JFIN Mod End */

    const apiNavItems: Array<NavItem> = [
      config.features.restApiDocs.isEnabled ? {
        text: 'REST API',
        nextRoute: { pathname: '/api-docs' as const },
        icon: apiDocsIcon,
        isActive: pathname === '/api-docs',
      } : null,
      config.features.graphqlApiDocs.isEnabled ? {
        text: 'GraphQL',
        nextRoute: { pathname: '/graphiql' as const },
        icon: graphQLIcon,
        isActive: pathname === '/graphiql',
      } : null,

      /* JFIN Mod Start */
      {
        text: 'JFIN Faucet',
        icon: walletIcon,
        url: 'https://faucet.testnet.jfinchain.com/',
      },
      {
        text: 'JFIN Chain Testnet',
        icon: testnetIcon,
        url: 'https://exp.testnet.jfinchain.com/',
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text: <NetworkAddToJFinWallet/> as any,
        icon: metamaskIcon,
      },

      /* JFIN Mod End */
    ].filter(Boolean);

    const mainNavItems: ReturnType['mainNavItems'] = [
      {
        text: 'Blockchain',
        icon: globeIcon,
        isActive: blockchainNavItems.flat().some(item => isInternalItem(item) && item.isActive),
        subItems: blockchainNavItems,
      },
      {
        text: 'Tokens',
        nextRoute: { pathname: '/tokens' as const },
        icon: tokensIcon,
        isActive: pathname.startsWith('/token'),
      },
      config.features.marketplace.isEnabled ? {
        text: 'Apps',
        nextRoute: { pathname: '/apps' as const },
        icon: appsIcon,
        isActive: pathname.startsWith('/app'),
      } : null,
      config.features.stats.isEnabled ? {
        text: 'Charts & stats',
        nextRoute: { pathname: '/stats' as const },
        icon: statsIcon,
        isActive: pathname === '/stats',
      } : null,

      /* JFIN Mod Start */
      // apiNavItems.length > 0 && {
      //   text: 'API',
      //   icon: apiDocsIcon,
      //   isActive: apiNavItems.some(item => isInternalItem(item) && item.isActive),
      //   subItems: apiNavItems,
      // },
      {
        text: 'Bridge',
        icon: rpcIcon,
        url: 'https://bridge.jfinchain.com/',
      },
      {
        text: 'Staking',
        icon: linkIcon,
        url: 'https://staking.jfinchain.com/',
      },

      /* JFIN Mod End */
      config.UI.sidebar.otherLinks.length > 0 ? {
        text: 'Other',
        icon: gearIcon,
        subItems: config.UI.sidebar.otherLinks,
      } : null,

      /* JFIN Mod Start */
      {
        text: 'Information',
        icon: docsIcon,
        subItems: informationNavItems,
      },
      {
        text: 'Developers',
        icon: gearIcon,
        subItems: apiNavItems,
      },
      {
        text: 'Network Profiles',
        icon: metamaskIcon,
        nextRoute: { pathname: '/network-profiles' as const },
        isActive: pathname === '/network-profiles',
      },

      /* JFIN Mod End */
    ].filter(Boolean);

    const accountNavItems: ReturnType['accountNavItems'] = [
      {
        text: 'Watch list',
        nextRoute: { pathname: '/account/watchlist' as const },
        icon: watchlistIcon,
        isActive: pathname === '/account/watchlist',
      },
      {
        text: 'Private tags',
        nextRoute: { pathname: '/account/tag-address' as const },
        icon: privateTagIcon,
        isActive: pathname === '/account/tag-address',
      },
      {
        text: 'Public tags',
        nextRoute: { pathname: '/account/public-tags-request' as const },
        icon: publicTagIcon, isActive: pathname === '/account/public-tags-request',
      },
      {
        text: 'API keys',
        nextRoute: { pathname: '/account/api-key' as const },
        icon: apiKeysIcon, isActive: pathname === '/account/api-key',
      },
      {
        text: 'Custom ABI',
        nextRoute: { pathname: '/account/custom-abi' as const },
        icon: abiIcon,
        isActive: pathname === '/account/custom-abi',
      },
      config.features.addressVerification.isEnabled && {
        text: 'Verified addrs',
        nextRoute: { pathname: '/account/verified-addresses' as const },
        icon: verifiedIcon,
        isActive: pathname === '/account/verified-addresses',
      },
    ].filter(Boolean);

    const profileItem = {
      text: 'My profile',
      nextRoute: { pathname: '/auth/profile' as const },
      iconComponent: UserAvatar,
      isActive: pathname === '/auth/profile',
    };

    return { mainNavItems, accountNavItems, profileItem };
  }, [ pathname ]);
}
