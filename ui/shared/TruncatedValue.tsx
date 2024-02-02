import { Skeleton, chakra } from '@chakra-ui/react';
import React from 'react';
import xss from 'xss';

import TruncatedTextTooltip from 'ui/shared/TruncatedTextTooltip';

interface Props {
  className?: string;
  isLoading?: boolean;
  value: string;
}

const TruncatedValue = ({ className, isLoading, value }: Props) => {
  return (
    <TruncatedTextTooltip label={ value }>
      <Skeleton
        className={ className }
        isLoaded={ !isLoading }
        display="inline-block"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        height="fit-content"
        dangerouslySetInnerHTML={{ __html: xss(value) }}
      />
    </TruncatedTextTooltip>
  );
};

export default React.memo(chakra(TruncatedValue));
