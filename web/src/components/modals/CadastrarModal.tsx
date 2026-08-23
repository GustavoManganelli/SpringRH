import React, { useState } from 'react';
import { ModalBase } from './ModalBase';
import type { CandidatoFormData } from '../../types/candidato';

interface CadastrarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CandidatoFormData) => void;
}

export const CadastrarModal: React.FC<CadastrarModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CandidatoFormData>({
    id: undefined,
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    departamentoVaga: '',
    pretencaoSalarial: undefined,
    cidade: '',
    status: 'EM ANÁLISE',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'id' || name === 'pretencaoSalarial'
          ? value === ''
            ? undefined
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar candidato"
      subtitle="Preencha os dados para adicionar uma nova pessoa ao processo."
      maxWidth={656}
      footer={
        <>
          <button type="button" className="btn-modal btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="submit"
            form="cadastrar-form"
            className="btn-modal btn-primary-submit"
          >
            Cadastrar
          </button>
        </>
      }
    >
      <form id="cadastrar-form" onSubmit={handleSubmit} className="modal-form-grid">
        <div className="form-group">
          <label className="form-label">ID *</label>
          <input
            type="number"
            name="id"
            className="form-input"
            placeholder="Ex.: 025"
            value={formData.id ?? ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nome completo *</label>
          <input
            type="text"
            name="nome"
            className="form-input"
            placeholder="Digite o nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">E-mail *</label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="nome@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Telefone</label>
          <input
            type="text"
            name="telefone"
            className="form-input"
            placeholder="(11) 99999-9999"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Cargo *</label>
          <input
            type="text"
            name="cargo"
            className="form-input"
            placeholder="Ex.: Analista de Dados"
            value={formData.cargo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Departamento</label>
          <input
            type="text"
            name="departamentoVaga"
            className="form-input"
            placeholder="Ex.: Tecnologia"
            value={formData.departamentoVaga}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Salário</label>
          <input
            type="number"
            name="pretencaoSalarial"
            className="form-input"
            placeholder="Ex.: 5000"
            value={formData.pretencaoSalarial ?? ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Cidade</label>
          <input
            type="text"
            name="cidade"
            className="form-input"
            placeholder="Ex.: São Paulo"
            value={formData.cidade}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label className="form-label">Status</label>
          <div className="select-container">
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="EM ANÁLISE">EM ANÁLISE</option>
              <option value="APROVADO">APROVADO</option>
              <option value="CONTRATADO">CONTRATADO</option>
              <option value="REPROVADO">REPROVADO</option>
            </select>
            <span className="select-arrow-input">⌄</span>
          </div>
        </div>
      </form>
    </ModalBase>
  );
};
