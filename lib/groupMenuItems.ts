import type { NavItem, NavItemExternal } from 'types/client/navigation-items';

export default function groupMenuItems(items: Array<NavItem> | Array<Array<NavItem>>) {
  const grouped: { [key: string]: Array<NavItem> } = { Ungrouped: [] };

  const addItemToGroup = (item: NavItem) => {
    const itemAsExternal = item as NavItemExternal;
    if (itemAsExternal.group) {
      if (!grouped[itemAsExternal.group]) {
        grouped[itemAsExternal.group] = [];
      }
      grouped[itemAsExternal.group].push(item);
    } else {
      grouped.Ungrouped.push(item);
    }
  };

  items.forEach(item => {
    if (Array.isArray(item)) {
      item.forEach(subItem => addItemToGroup(subItem));
    } else {
      addItemToGroup(item);
    }
  });

  return grouped;
}
