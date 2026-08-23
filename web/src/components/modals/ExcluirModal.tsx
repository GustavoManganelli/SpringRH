import React from 'react';
import { ModalBase } from './ModalBase';
import type { Candidato } from '../../types/candidato';

interface ExcluirModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidato: Candidato | null;
  onConfirm: (id: number) => void;
}

export const ExcluirModal: React.FC<ExcluirModalProps> = ({
  isOpen,
  onClose,
  candidato,
  onConfirm,
}) => {
  if (!candidato) return null;

  const handleConfirm = () => {
    onConfirm(candidato.id);
    onClose();
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Excluir candidato"
      subtitle="Essa ação não poderá ser desfeita."
      maxWidth={480}
      footer={
        <>
          <button type="button" className="btn-modal btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="button"
            className="btn-modal btn-danger-submit"
            onClick={handleConfirm}
          >
            Excluir
          </button>
        </>
      }
    >
      <div className="delete-modal-content">
        <p className="delete-confirmation-text">
          Tem certeza que deseja excluir este candidato?
        </p>
        <p className="delete-candidate-info">
          <strong>{candidato.nome}</strong> (ID: {String(candidato.id).padStart(3, '0')})
        </p>
      </div>
    </ModalBase>
  );
};
