import BigNumber from 'bignumber.js';

import type { Block } from 'types/api/block';

/* JFIN Mod Start */
import { getEnvValue } from 'configs/app/utils';
import { WEI } from 'lib/consts';
const CHAIN_REWARD = getEnvValue('NEXT_PUBLIC_CHAIN_REWARD');
const JFIN_REWARD = getEnvValue('NEXT_PUBLIC_JFIN_REWARD');
const START_REWARD_BLOCK = 5;
const END_REWARD_BLOCK = 52560000;
const CHAIN_REWARD_START_BLOCK = 8991255;

/* JFIN Mod End */

export default function getBlockReward(block: Block) {

  /* JFIN Mod Start */
  const chainReward = BigNumber(CHAIN_REWARD || 0).multipliedBy(WEI);
  const jfinReward = BigNumber(JFIN_REWARD || 0).multipliedBy(WEI);

  /* JFIN Mod End */

  const txFees = BigNumber(block.tx_fees || 0);
  const burntFees = BigNumber(block.burnt_fees || 0);
  const minerReward = BigNumber(block.rewards?.find(({ type }) => type === 'Miner Reward' || type === 'Validator Reward')?.reward || 0);

  /* JFIN Mod Start */
  let totalReward;

  if (block.height <= START_REWARD_BLOCK || block.height > END_REWARD_BLOCK) {
    totalReward = BigNumber(0);
  } else if (block.height > CHAIN_REWARD_START_BLOCK && block.height < END_REWARD_BLOCK) {
    totalReward = minerReward.minus(chainReward).plus(jfinReward);
  } else {
    totalReward = minerReward.plus(jfinReward);
  }

  /* JFIN Mod End */
  const staticReward = totalReward.minus(txFees).plus(burntFees);

  return {
    totalReward,
    staticReward,
    txFees,
    burntFees,
  };
}
