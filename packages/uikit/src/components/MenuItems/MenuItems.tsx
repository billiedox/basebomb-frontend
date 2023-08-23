/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement } from "react";
import { Flex } from "../Box";
import isTouchDevice from "../../util/isTouchDevice";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import MenuItem from "../MenuItem/MenuItem";
import { MenuItemsProps } from "./types";

const MenuItems: React.FC<MenuItemsProps> = ({ items = [], activeItem, activeSubItem, ...props }) => {
  return (
    <Flex {...props}>
      {items.map(({ label, items: menuItems = [], href, icon }) => {
        const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color;
        const isActive = activeItem === href;
        const linkProps = isTouchDevice() && menuItems && menuItems.length > 0 ? {} : { href };
        const Icon = icon;
        return (
          <DropdownMenu key={`${label}#${href}`} items={menuItems} py={2} px={3} activeItem={activeSubItem}>
            <MenuItem {...linkProps} isActive={isActive} statusColor={statusColor}>
              {label || (icon && createElement(Icon as any, { color: isActive ? "primary" : "textSubtle" }))}
            </MenuItem>
          </DropdownMenu>
        );
      })}
    </Flex>
  );
};

export default MenuItems;
