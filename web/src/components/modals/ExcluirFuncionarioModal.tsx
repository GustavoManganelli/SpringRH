import React from 'react';
import { ModalBase } from './ModalBase';
import type { Funcionario } from '../../types/funcionario';

interface ExcluirFuncionarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  funcionario: Funcionario | null;
  onConfirm: (id: number) => void;
}

export const ExcluirFuncionarioModal: React.FC<ExcluirFuncionarioModalProps> = ({ isOpen, onClose, funcionario, onConfirm }) => {
  if (!funcionario) return null;

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Excluir funcionário"
      subtitle="Essa ação não poderá ser desfeita."
      maxWidth={480}
      footer={<>
        <button type="button" className="btn-modal btn-cancel" onClick={onClose}>Cancelar</button>
        <button type="button" className="btn-modal btn-danger-submit" onClick={() => { onConfirm(funcionario.id); onClose(); }}>Excluir</button>
      </>}
    >
      <div className="delete-modal-content">
        <p className="delete-confirmation-text">Tem certeza que deseja excluir este funcionário?</p>
        <p className="delete-candidate-info"><strong>{funcionario.nome}</strong> (ID: {String(funcionario.id).padStart(3, '0')})</p>
      </div>
    </ModalBase>
  );
};
