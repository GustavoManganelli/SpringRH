import React from 'react';
import type { Funcionario } from '../types/funcionario';

interface FuncionarioTableProps {
  funcionarios: Funcionario[];
  onView: (funcionario: Funcionario) => void;
  onEdit: (funcionario: Funcionario) => void;
  onDelete: (funcionario: Funcionario) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const FuncionarioTable: React.FC<FuncionarioTableProps> = ({
  funcionarios,
  onView,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const formatId = (id: number) => String(id).padStart(3, '0');

  const getStatusBadgeClass = (status: string) => {
    const normalized = status.toUpperCase().trim();
    if (normalized === 'ATIVO') return 'badge-status badge-aprovado';
    if (normalized === 'INATIVO') return 'badge-status badge-reprovado';
    return 'badge-status badge-default';
  };

  return (
    <div className="table-card-container">
      <div className="table-wrapper">
        <table className="candidate-table">
          <thead>
            <tr>
              <th className="th-id">ID</th>
              <th className="th-candidate">Funcionário</th>
              <th className="th-email">E-mail</th>
              <th className="th-role">Cargo</th>
              <th className="th-department">Departamento</th>
              <th className="th-city">Cidade</th>
              <th className="th-status">Status</th>
              <th className="th-actions">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty-state-cell">Nenhum funcionário encontrado.</td>
              </tr>
            ) : (
              funcionarios.map((funcionario, index) => (
                <tr key={funcionario.id} className={index % 2 === 1 ? 'row-alt' : 'row-regular'}>
                  <td className="td-id">{formatId(funcionario.id)}</td>
                  <td className="td-candidate">
                    <div className="candidate-name">{funcionario.nome}</div>
                    <div className="candidate-sublabel">Funcionário</div>
                  </td>
                  <td className="td-email">{funcionario.email}</td>
                  <td className="td-role">{funcionario.cargo}</td>
                  <td className="td-department">{funcionario.departamento}</td>
                  <td className="td-city">{funcionario.cidade}</td>
                  <td className="td-status">
                    <span className={getStatusBadgeClass(funcionario.status)}>
                      {funcionario.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="td-actions">
                    <button type="button" className="btn-action btn-action-view" onClick={() => onView(funcionario)}>Ver</button>
                    <button type="button" className="btn-action btn-action-edit" onClick={() => onEdit(funcionario)}>Editar</button>
                    <button type="button" className="btn-action btn-action-delete" onClick={() => onDelete(funcionario)}>Excluir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-pagination">
        <button type="button" className="page-nav-btn" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>‹</button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button key={page} type="button" className={`page-number-btn ${currentPage === page ? 'active' : ''}`} onClick={() => onPageChange(page)}>{page}</button>
        ))}
        <button type="button" className="page-nav-btn" disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>›</button>
      </div>
    </div>
  );
};
