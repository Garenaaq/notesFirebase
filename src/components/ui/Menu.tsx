import { Menu as MenuChakra, Portal } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";

interface MenuProps {
  trigger: ReactNode;
  items: MenuChakra.ItemProps[];
}

export const Menu: FC<MenuProps> = ({ trigger, items }) => {
  return (
    <MenuChakra.Root>
      <MenuChakra.Trigger asChild>{trigger}</MenuChakra.Trigger>
      <Portal>
        <MenuChakra.Positioner>
          <MenuChakra.Content>
            {items.map((item, index) => (
              <MenuChakra.Item key={index} {...item} cursor="pointer" />
            ))}
          </MenuChakra.Content>
        </MenuChakra.Positioner>
      </Portal>
    </MenuChakra.Root>
  );
};
