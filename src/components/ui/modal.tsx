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
  useEffect(() => {
    setIsClient(true);
  });
  if (!isOpen || !isClient) return <></>;
  return createPortal(
    <div
      className={"z-50000 fixed bg-primary-900 w-svw h-full " + className}
      onClick={onClose}
    >
      {children}
    </div>,
    document.getElementById("root") as HTMLElement
  );
};

export default Modal;
