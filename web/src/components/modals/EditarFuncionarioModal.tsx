import React from 'react';
import { ModalBase } from './ModalBase';
import { FuncionarioForm } from './FuncionarioForm';
import type { Funcionario, FuncionarioFormData } from '../../types/funcionario';

interface EditarFuncionarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  funcionario: Funcionario | null;
  onSubmit: (id: number, data: FuncionarioFormData) => void;
}

export const EditarFuncionarioModal: React.FC<EditarFuncionarioModalProps> = ({ isOpen, onClose, funcionario, onSubmit }) => {
  if (!funcionario) return null;

  const handleSubmit = (data: FuncionarioFormData) => {
    onSubmit(funcionario.id, data);
    onClose();
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Editar funcionário"
      subtitle="Altere os dados necessários e salve as mudanças."
      maxWidth={656}
      footer={<>
        <button type="button" className="btn-modal btn-cancel" onClick={onClose}>Cancelar</button>
        <button type="submit" form="editar-funcionario-form" className="btn-modal btn-primary-submit">Salvar alterações</button>
      </>}
    >
      <FuncionarioForm
        key={funcionario.id}
        formId="editar-funcionario-form"
        showId
        initialData={{ ...funcionario }}
        onSubmit={handleSubmit}
      />
    </ModalBase>
  );
};
