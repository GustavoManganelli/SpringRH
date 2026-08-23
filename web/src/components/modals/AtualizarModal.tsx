import React, { useState } from 'react';
import { ModalBase } from './ModalBase';
import type { Candidato, CandidatoPatchData } from '../../types/candidato';

interface AtualizarModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidato: Candidato | null;
  onSubmit: (id: number, data: CandidatoPatchData) => void;
}

interface AtualizarFormContentProps {
  candidato: Candidato;
  onClose: () => void;
  onSubmit: (id: number, data: CandidatoPatchData) => void;
}

const AtualizarFormContent: React.FC<AtualizarFormContentProps> = ({
  candidato,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CandidatoPatchData>({
    cargo: candidato.cargo,
    status: candidato.status,
    pretencaoSalarial: candidato.pretencaoSalarial,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'pretencaoSalarial'
          ? value === ''
            ? undefined
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(candidato.id, formData);
    onClose();
  };

  return (
    <form id="atualizar-form" onSubmit={handleSubmit} className="modal-form-grid">
      <div className="form-group">
        <label className="form-label">Cargo</label>
        <input
          type="text"
          name="cargo"
          className="form-input"
          placeholder="Ex.: Analista de Dados"
          value={formData.cargo ?? ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Status</label>
        <div className="select-container">
          <select
            name="status"
            className="form-select"
            value={formData.status ?? ''}
            onChange={handleChange}
          >
            <option value="">Selecione o status</option>
            <option value="EM ANÁLISE">EM ANÁLISE</option>
            <option value="APROVADO">APROVADO</option>
            <option value="CONTRATADO">CONTRATADO</option>
            <option value="REPROVADO">REPROVADO</option>
          </select>
          <span className="select-arrow-input">⌄</span>
        </div>
      </div>

      <div className="form-group full-width">
        <label className="form-label">Salário</label>
        <input
          type="number"
          name="pretencaoSalarial"
          className="form-input"
          placeholder="Ex.: 5500"
          value={formData.pretencaoSalarial ?? ''}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export const AtualizarModal: React.FC<AtualizarModalProps> = ({
  isOpen,
  onClose,
  candidato,
  onSubmit,
}) => {
  if (!isOpen || !candidato) return null;

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Atualizar candidato"
      subtitle="Preencha apenas os campos que deseja alterar."
      maxWidth={520}
      footer={
        <>
          <button type="button" className="btn-modal btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="submit"
            form="atualizar-form"
            className="btn-modal btn-primary-submit"
          >
            Atualizar
          </button>
        </>
      }
    >
      <AtualizarFormContent
        key={candidato.id}
        candidato={candidato}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </ModalBase>
  );
};
