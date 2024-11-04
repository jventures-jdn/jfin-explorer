import { Icon, Image } from '@chakra-ui/react';
import React from 'react';

import type { NavItem, NavGroupItem } from 'types/client/navigation-items';

const NavLinkIcon = ({ item }: { item: NavItem | NavGroupItem}) => {
  if ('icon' in item) {
    return <Icon as={ item.icon } boxSize="30px"/>;
  }
  if ('iconComponent' in item && item.iconComponent) {
    const IconComponent = item.iconComponent;
    return <IconComponent size={ 30 }/>;
  }
  if ('iconImage' in item && item.iconImage) {
    return <Image src={ item.iconImage } maxW="30px" maxH="30px" alt="nav-icon"/>;
  }

  return null;
};

export default NavLinkIcon;
