import React from 'react';
import { ModalBase } from './ModalBase';
import { FuncionarioForm } from './FuncionarioForm';
import type { FuncionarioFormData } from '../../types/funcionario';

interface CadastrarFuncionarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FuncionarioFormData) => void;
}

const initialData: FuncionarioFormData = {
  nome: '',
  email: '',
  telefone: '',
  cargo: '',
  departamento: '',
  salario: undefined,
  cidade: '',
  status: 'ATIVO',
};

export const CadastrarFuncionarioModal: React.FC<CadastrarFuncionarioModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const handleSubmit = (data: FuncionarioFormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Novo funcionário"
      subtitle="Preencha as informações para cadastrar um colaborador."
      maxWidth={656}
      footer={<>
        <button type="button" className="btn-modal btn-cancel" onClick={onClose}>Cancelar</button>
        <button type="submit" form="cadastrar-funcionario-form" className="btn-modal btn-primary-submit">Cadastrar funcionário</button>
      </>}
    >
      <FuncionarioForm formId="cadastrar-funcionario-form" initialData={initialData} onSubmit={handleSubmit} />
    </ModalBase>
  );
};
