import {
  Menu,
  MenuButton,
  type MenuButtonProps,
  type MenuProps,
  Portal,
  type PortalProps,
  useEventListener,
} from '@chakra-ui/react';
import { type MutableRefObject, useCallback, useEffect, useState } from 'react';

export interface ContextMenuProps<T extends HTMLElement> {
  targetRef: MutableRefObject<T | null>;
  menuProps?: Omit<MenuProps, 'children'> & { children?: React.ReactNode };
  portalProps?: Omit<PortalProps, 'children'> & { children?: React.ReactNode };
  menuButtonProps?: MenuButtonProps;
  renderMenu: (target: MouseEvent | undefined) => JSX.Element | null;
}

export const ContextMenu = <T extends HTMLElement = HTMLElement>({
  targetRef,
  renderMenu,
  menuProps,
  portalProps,
  menuButtonProps,
}: ContextMenuProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isDeferredOpen, setIsDeferredOpen] = useState(false);
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [event, setEvent] = useState<MouseEvent>();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsRendered(true);
        setTimeout(() => {
          setIsDeferredOpen(true);
        });
      });

      return undefined;
    }
    setIsDeferredOpen(false);

    const timeout = setTimeout(() => {
      setIsRendered(isOpen);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEventListener('contextmenu', (e) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    if (targetRef.current?.contains(e.target as any) ?? e.target === targetRef.current) {
      e.preventDefault();
      setEvent(e);
      setIsOpen(true);
      setPosition([e.pageX, e.pageY]);
    } else {
      setIsOpen(false);
    }
  });

  const onCloseHandler = useCallback(() => {
    menuProps?.onClose?.();
    setIsOpen(false);
  }, [menuProps]);

  return (
    <Portal {...portalProps}>
      <Menu
        isOpen={isRendered && isDeferredOpen}
        gutter={0}
        {...menuProps}
        onClose={onCloseHandler}
      >
        <MenuButton
          aria-hidden
          w={1}
          h={1}
          style={{
            position: 'absolute',
            left: position[0],
            top: position[1],
            cursor: 'default',
          }}
          {...menuButtonProps}
        />

        {renderMenu(event)}
      </Menu>
    </Portal>
  );
};
