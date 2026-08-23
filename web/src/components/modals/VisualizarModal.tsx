import React from 'react';
import { ModalBase } from './ModalBase';
import type { Candidato } from '../../types/candidato';

interface VisualizarModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidato: Candidato | null;
}

export const VisualizarModal: React.FC<VisualizarModalProps> = ({
  isOpen,
  onClose,
  candidato,
}) => {
  if (!candidato) return null;

  const formatCurrency = (val?: number) => {
    if (val === undefined || val === null) return 'R$ 0,00';
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatId = (id: number) => {
    return String(id).padStart(3, '0');
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Dados do candidato"
      subtitle="Consulte as informações do candidato selecionado."
      maxWidth={560}
      footer={
        <button type="button" className="btn-modal btn-cancel" onClick={onClose}>
          Fechar
        </button>
      }
    >
      <div className="view-details-grid">
        <div className="detail-item">
          <span className="detail-label">ID</span>
          <span className="detail-value">{formatId(candidato.id)}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Nome</span>
          <span className="detail-value">{candidato.nome}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">E-mail</span>
          <span className="detail-value">{candidato.email}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Telefone</span>
          <span className="detail-value">{candidato.telefone || '-'}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Cargo</span>
          <span className="detail-value">{candidato.cargo}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Departamento</span>
          <span className="detail-value">{candidato.departamentoVaga || '-'}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Salário</span>
          <span className="detail-value">
            {formatCurrency(candidato.pretencaoSalarial)}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Cidade</span>
          <span className="detail-value">{candidato.cidade || '-'}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Status</span>
          <span className="detail-value status-highlight">{candidato.status}</span>
        </div>
      </div>
    </ModalBase>
  );
};
