import React from 'react';
import { ModalBase } from './ModalBase';
import type { Funcionario } from '../../types/funcionario';

interface VisualizarFuncionarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  funcionario: Funcionario | null;
}

export const VisualizarFuncionarioModal: React.FC<VisualizarFuncionarioModalProps> = ({ isOpen, onClose, funcionario }) => {
  if (!funcionario) return null;

  const formatCurrency = (value?: number) => (value ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const formatDate = (value?: string | Date) => value ? new Date(value).toLocaleDateString('pt-BR') : '-';

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Dados do funcionário"
      subtitle="Consulte as informações do colaborador selecionado."
      maxWidth={560}
      footer={<button type="button" className="btn-modal btn-cancel" onClick={onClose}>Fechar</button>}
    >
      <div className="view-details-grid">
        <div className="detail-item"><span className="detail-label">ID</span><span className="detail-value">{String(funcionario.id).padStart(3, '0')}</span></div>
        <div className="detail-item"><span className="detail-label">Nome</span><span className="detail-value">{funcionario.nome}</span></div>
        <div className="detail-item"><span className="detail-label">E-mail</span><span className="detail-value">{funcionario.email}</span></div>
        <div className="detail-item"><span className="detail-label">Telefone</span><span className="detail-value">{funcionario.telefone || '-'}</span></div>
        <div className="detail-item"><span className="detail-label">Cargo</span><span className="detail-value">{funcionario.cargo}</span></div>
        <div className="detail-item"><span className="detail-label">Departamento</span><span className="detail-value">{funcionario.departamento || '-'}</span></div>
        <div className="detail-item"><span className="detail-label">Salário</span><span className="detail-value">{formatCurrency(funcionario.salario)}</span></div>
        <div className="detail-item"><span className="detail-label">Data de admissão</span><span className="detail-value">{formatDate(funcionario.dataAdmissao)}</span></div>
        <div className="detail-item"><span className="detail-label">Cidade</span><span className="detail-value">{funcionario.cidade || '-'}</span></div>
        <div className="detail-item"><span className="detail-label">Status</span><span className="detail-value status-highlight">{funcionario.status}</span></div>
      </div>
    </ModalBase>
  );
};
