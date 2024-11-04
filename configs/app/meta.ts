import { getEnvValue } from './utils';

const meta = Object.freeze({
  promoteBlockscoutInTitle: getEnvValue('NEXT_PUBLIC_PROMOTE_BLOCKSCOUT_IN_TITLE') || 'true',
  og: {
    description: getEnvValue('NEXT_PUBLIC_OG_DESCRIPTION') || '',
    imageUrl: `assets/og_image.png`,
  },
});

export default meta;
