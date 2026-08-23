import React from 'react';
import type { Candidato } from '../types/candidato';

interface CandidateTableProps {
  candidatos: Candidato[];
  onView: (candidato: Candidato) => void;
  onEdit: (candidato: Candidato) => void;
  onDelete: (candidato: Candidato) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CandidateTable: React.FC<CandidateTableProps> = ({
  candidatos,
  onView,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const formatId = (id: number) => {
    return String(id).padStart(3, '0');
  };

  const getStatusBadgeClass = (status: string) => {
    const s = status.toUpperCase().trim();
    if (s === 'EM ANÁLISE' || s === 'EM ANALISE') return 'badge-status badge-em-analise';
    if (s === 'APROVADO') return 'badge-status badge-aprovado';
    if (s === 'CONTRATADO') return 'badge-status badge-contratado';
    if (s === 'REPROVADO') return 'badge-status badge-reprovado';
    return 'badge-status badge-default';
  };

  return (
    <div className="table-card-container">
      <div className="table-wrapper">
        <table className="candidate-table">
          <thead>
            <tr>
              <th className="th-id">ID</th>
              <th className="th-candidate">Candidato</th>
              <th className="th-email">E-mail</th>
              <th className="th-role">Cargo</th>
              <th className="th-department">Departamento</th>
              <th className="th-city">Cidade</th>
              <th className="th-status">Status</th>
              <th className="th-actions">Ações</th>
            </tr>
          </thead>
          <tbody>
            {candidatos.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty-state-cell">
                  Nenhum candidato encontrado.
                </td>
              </tr>
            ) : (
              candidatos.map((candidato, index) => (
                <tr
                  key={candidato.id}
                  className={index % 2 === 1 ? 'row-alt' : 'row-regular'}
                >
                  <td className="td-id">{formatId(candidato.id)}</td>
                  <td className="td-candidate">
                    <div className="candidate-name">{candidato.nome}</div>
                    <div className="candidate-sublabel">Candidato</div>
                  </td>
                  <td className="td-email">{candidato.email}</td>
                  <td className="td-role">{candidato.cargo}</td>
                  <td className="td-department">{candidato.departamentoVaga}</td>
                  <td className="td-city">{candidato.cidade}</td>
                  <td className="td-status">
                    <span className={getStatusBadgeClass(candidato.status)}>
                      {candidato.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="td-actions">
                    <button
                      type="button"
                      className="btn-action btn-action-view"
                      onClick={() => onView(candidato)}
                    >
                      Ver
                    </button>
                    <button
                      type="button"
                      className="btn-action btn-action-edit"
                      onClick={() => onEdit(candidato)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn-action btn-action-delete"
                      onClick={() => onDelete(candidato)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-pagination">
        <button
          type="button"
          className="page-nav-btn"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            className={`page-number-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="page-nav-btn"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
};
