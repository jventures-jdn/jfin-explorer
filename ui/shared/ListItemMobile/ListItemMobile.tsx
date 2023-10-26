import { Flex, chakra } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  isAnimated?: boolean;
}

const ListItemMobile = ({ children, className, isAnimated }: Props) => {
  return (
    <Flex
      as={ motion.div }
      initial={ isAnimated ? { opacity: 0, scale: 0.97 } : { opacity: 1, scale: 1 } }
      animate={{ opacity: 1, scale: 1 }}
      transitionDuration="normal"
      transitionTimingFunction="linear"
      rowGap={ 6 }
      alignItems="flex-start"
      flexDirection="column"
      paddingY={ 6 }
      borderColor="divider"
      _last={{
        borderBottomWidth: '1px',
      }}
      className={ className }
      fontSize="16px"
      lineHeight="20px"

      /* JFIN Mod Start */
      boxShadow="md"
      borderRadius="md"
      p={ 6 }
      mt={ 3 }

      /* JFIN Mod End */
    >
      { children }
    </Flex>
  );
};

export default chakra(ListItemMobile);
