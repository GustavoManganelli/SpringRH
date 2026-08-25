import React, { useState } from 'react';
import type { FuncionarioFormData } from '../../types/funcionario';

interface FuncionarioFormProps {
  formId: string;
  initialData: FuncionarioFormData;
  onSubmit: (data: FuncionarioFormData) => void;
  showId?: boolean;
}

export const FuncionarioForm: React.FC<FuncionarioFormProps> = ({
  formId,
  initialData,
  onSubmit,
  showId = false,
}) => {
  const [formData, setFormData] = useState<FuncionarioFormData>(initialData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: name === 'salario' ? (value === '' ? undefined : Number(value)) : value,
    }));
  };

  return (
    <form
      id={formId}
      className="modal-form-grid"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formData);
      }}
    >
      {showId && (
        <div className="form-group">
          <label className="form-label">ID</label>
          <input type="number" className="form-input disabled-input" value={formData.id} disabled />
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Nome completo *</label>
        <input type="text" name="nome" className="form-input" placeholder="Digite o nome completo" value={formData.nome} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label">E-mail *</label>
        <input type="email" name="email" className="form-input" placeholder="nome@email.com" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label">Telefone *</label>
        <input type="text" name="telefone" className="form-input" placeholder="(11) 99999-9999" value={formData.telefone} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label">Cargo *</label>
        <input type="text" name="cargo" className="form-input" placeholder="Ex.: Analista de Dados" value={formData.cargo} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label">Departamento *</label>
        <input type="text" name="departamento" className="form-input" placeholder="Ex.: Tecnologia" value={formData.departamento} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label">Salário *</label>
        <input type="number" name="salario" className="form-input" min="0" step="0.01" placeholder="Ex.: 5000" value={formData.salario ?? ''} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label">Cidade *</label>
        <input type="text" name="cidade" className="form-input" placeholder="Ex.: São Paulo" value={formData.cidade} onChange={handleChange} required />
      </div>

      <div className="form-group full-width">
        <label className="form-label">Status *</label>
        <div className="select-container">
          <select name="status" className="form-select" value={formData.status} onChange={handleChange} required>
            <option value="ATIVO">ATIVO</option>
            <option value="INATIVO">INATIVO</option>
          </select>
          <span className="select-arrow-input">⌄</span>
        </div>
      </div>
    </form>
  );
};
