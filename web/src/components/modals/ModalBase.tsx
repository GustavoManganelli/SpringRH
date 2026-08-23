import React, { useEffect } from 'react';

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  maxWidth?: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const ModalBase: React.FC<ModalBaseProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidth = 656,
  children,
  footer,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: `${maxWidth}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 className="modal-title">{title}</h2>
            <p className="modal-subtitle">{subtitle}</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>

        <div className="modal-divider" />

        <div className="modal-body">{children}</div>

        {footer && (
          <>
            <div className="modal-divider" />
            <div className="modal-footer">{footer}</div>
          </>
        )}
      </div>
    </div>
  );
};
