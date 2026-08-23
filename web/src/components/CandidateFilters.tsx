import React from 'react';

interface CandidateFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  totalCandidates: number;
  onNewCandidateClick: () => void;
}

export const CandidateFilters: React.FC<CandidateFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  totalCandidates,
  onNewCandidateClick,
}) => {
  return (
    <div className="page-header-container">
      <div className="title-action-row">
        <div className="page-title-group">
          <h1 className="page-title">Candidatos</h1>
          <p className="page-subtitle">
            Acompanhe e gerencie as pessoas do processo seletivo.
          </p>
        </div>

        <button
          type="button"
          className="btn-new-candidate"
          onClick={onNewCandidateClick}
        >
          + Novo candidato
        </button>
      </div>

      <div className="filters-row">
        <div className="search-box">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por ID, nome, cargo ou status"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="filter-select-wrapper">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <option value="TODOS">Status: todos</option>
            <option value="EM ANÁLISE">EM ANÁLISE</option>
            <option value="APROVADO">APROVADO</option>
            <option value="CONTRATADO">CONTRATADO</option>
            <option value="REPROVADO">REPROVADO</option>
          </select>
          <span className="select-arrow">⌄</span>
        </div>
      </div>

      <div className="candidate-count-text">
        {totalCandidates} {totalCandidates === 1 ? 'candidato' : 'candidatos'}
      </div>
    </div>
  );
};
