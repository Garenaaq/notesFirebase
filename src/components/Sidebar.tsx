import { useState, type ReactNode } from "react";
import { Box, Drawer, IconButton, Portal, useBreakpointValue } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface SidebarProps {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  initialOpen?: boolean;
  maxWidth?: number;
}

export function Sidebar({
  header,
  footer,
  children,
  initialOpen = true,
  maxWidth = 320,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const sidebarContent = (
    <Box
      position={isMobile ? "absolute" : "relative"}
      top={0}
      left={0}
      maxW={isOpen ? maxWidth : undefined}
      w={isOpen ? "full" : undefined}
      zIndex={10}
      h={isMobile ? "100vh" : "auto"}
    >
      {!isOpen && (
        <IconButton
          position="fixed"
          top={3}
          left={3}
          size="sm"
          variant="ghost"
          colorScheme="gray"
          bg="gray.800"
          _hover={{ bg: "gray.700" }}
          onClick={() => setIsOpen(true)}
        >
          <FaChevronRight />
        </IconButton>
      )}

      <Drawer.Root open={isOpen} placement="start" size="xs" trapFocus={false} modal={isMobile}>
        <Drawer.Content bg="gray.800" h="100vh" borderRightWidth="1px" borderColor="gray.700">
          {header && (
            <Drawer.Header
              p={3}
              borderBottomWidth="1px"
              borderColor="gray.700"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {header}
              <IconButton
                variant="ghost"
                colorScheme="gray"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <FaChevronLeft />
              </IconButton>
            </Drawer.Header>
          )}

          <Drawer.Body p={0}>{children}</Drawer.Body>

          {footer && <Drawer.Footer paddingLeft={4}>{footer}</Drawer.Footer>}
        </Drawer.Content>
      </Drawer.Root>
    </Box>
  );

  if (isMobile) {
    return <Portal>{sidebarContent}</Portal>;
  }

  return sidebarContent;
}
