"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayClassName?: string;
  wrapperClassName?: string;
}
const MainModal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  ...classNames
}) => {
  const [mounted, setMounted] = useState(false);

  // Ensure we are on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return <></>;

  return createPortal(
    <div
      className={cn(
        "z-50 fixed inset-0 flex justify-center items-center bg-black/50",
        classNames.overlayClassName
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white p-6 rounded-lg w-full max-w-fit",
          classNames.wrapperClassName
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default MainModal;
