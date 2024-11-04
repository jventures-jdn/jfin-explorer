import type React from 'react';

import type { Route } from 'nextjs-routes';

type NavIconOrComponent = {
  icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
} | {
  iconComponent?: React.FC<{size?: number}>;
} | {
  iconImage?: string;
};

type NavItemCommon = {
  text: string;
} & NavIconOrComponent;

export type NavItemInternal = NavItemCommon & {
  nextRoute: Route;
  isActive?: boolean;
}

export type NavItemExternal = {
  text: string;

  /* JFIN Mod Start */
  url?: string;
  group?: string;

  /* JFIN Mod End */
}

export type NavItem = NavItemInternal | NavItemExternal

export type NavGroupItem = NavItemCommon & {
  isActive?: boolean;
  subItems: Array<NavItem> | Array<Array<NavItem>>;
}

import type { ArrayElement } from '../utils';

export const NAVIGATION_LINK_IDS = [ 'rpc_api', 'eth_rpc_api' ] as const;
export type NavigationLinkId = ArrayElement<typeof NAVIGATION_LINK_IDS>;
