/* JFIN Mod Start */
export interface NetworkProfiles {
  [key: string]: NetworkProfile;
}

export interface NetworkProfile {
  name: string;
  token: string;
  rpc: string;
  chainId: string;
  explorerUrl: string;
  websiteUrl: string;
}

/* JFIN Mod End */
