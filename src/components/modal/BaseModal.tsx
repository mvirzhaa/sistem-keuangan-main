import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = "",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in overflow-y-auto"
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full p-6 relative transition-all transform scale-100 animate-scale-up my-auto ${maxWidth} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header jika title atau showCloseButton aktif */}
        {(title || showCloseButton) && (
          <div className="flex justify-between items-center mb-4">
            {typeof title === "string" ? (
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {title}
              </h2>
            ) : (
              title || <div />
            )}

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 active:text-gray-800 transition-colors p-1 cursor-pointer"
                aria-label="Tutup modal"
              >
                <IoMdClose size={22} />
              </button>
            )}
          </div>
        )}

        {/* Content Modal */}
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default BaseModal;
