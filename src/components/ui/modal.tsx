import React, { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}
const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  className,
}) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setIsClient(true);
    const root = document.getElementById("__next") || document.body;
    setPortalRoot(root);
  }, []);

  if (!isOpen || !isClient || !portalRoot) return <></>;
  
  return createPortal(
    <div className={"fixed inset-0 z-[9999] bg-primary-900 w-full h-full " + (className || "")} onClick={onClose}>
      {children}
    </div>,
    portalRoot
  );
};

export default Modal;
