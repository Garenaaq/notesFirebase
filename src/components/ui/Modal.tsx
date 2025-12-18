import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { type ComponentProps, type FC, type ReactNode } from "react";

interface ModalProps extends ComponentProps<typeof Dialog.Root> {
  trigger?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ trigger, header, footer, children, ...dialogProps }) => {
  return (
    <Dialog.Root {...dialogProps}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {header && <Dialog.Header>{header}</Dialog.Header>}
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.Footer>
              {footer ?? (
                <>
                  <Dialog.CloseTrigger asChild>
                    <Button variant="outline">Закрыть</Button>
                  </Dialog.CloseTrigger>
                  <Button>Сохранить</Button>
                </>
              )}
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
