import BigNumber from 'bignumber.js';

import type { Block } from 'types/api/block';

/* JFIN Mod Start */
import { getEnvValue } from 'configs/app/utils';
import { WEI } from 'lib/consts';
const CHAIN_REWARD = getEnvValue('NEXT_PUBLIC_CHAIN_REWARD');
const JFIN_REWARD = getEnvValue('NEXT_PUBLIC_JFIN_REWARD');

/* JFIN Mod End */

export default function getBlockReward(block: Block) {

  /* JFIN Mod Start */
  const chainReward = BigNumber(CHAIN_REWARD || 0).multipliedBy(WEI);
  const jfinReward = BigNumber(JFIN_REWARD || 0).multipliedBy(WEI);

  /* JFIN Mod End */

  const txFees = BigNumber(block.tx_fees || 0);
  const burntFees = BigNumber(block.burnt_fees || 0);
  const minerReward = block.rewards?.find(({ type }) => type === 'Miner Reward' || type === 'Validator Reward')?.reward;

  /* JFIN Mod Start */
  const totalReward = BigNumber(minerReward || 0).minus(chainReward).plus(jfinReward);

  /* JFIN Mod End */
  const staticReward = totalReward.minus(txFees).plus(burntFees);

  return {
    totalReward,
    staticReward,
    txFees,
    burntFees,
  };
}
