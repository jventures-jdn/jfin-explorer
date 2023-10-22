import BigNumber from 'bignumber.js';

import type { Block } from 'types/api/block';

import { getEnvValue } from 'configs/app/utils';
import { WEI, ZERO } from 'lib/consts';

/* JFIN Mod Start */
const CHAIN_REWARD = getEnvValue('NEXT_PUBLIC_CHAIN_REWARD');
const JFIN_REWARD = getEnvValue('NEXT_PUBLIC_JFIN_REWARD');

/* JFIN Mod End */

export default function getBlockTotalReward(block: Block) {
  /* JFIN Mod Start */
  const chainReward = BigNumber(CHAIN_REWARD || 0).multipliedBy(WEI);
  const jfinReward = BigNumber(JFIN_REWARD || 0).multipliedBy(WEI);
  const totalReward = block.rewards
    ?.map(({ reward }) => BigNumber(reward).minus(chainReward).plus(jfinReward))
    .reduce((result, item) => result.plus(item), ZERO) || ZERO;

  /* JFIN Mod End */

  return totalReward.div(WEI);
}
