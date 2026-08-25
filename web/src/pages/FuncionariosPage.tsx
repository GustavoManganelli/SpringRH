import React, { useEffect, useMemo, useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { FuncionarioTable } from '../components/FuncionarioTable';
import { CadastrarFuncionarioModal } from '../components/modals/CadastrarFuncionarioModal';
import { EditarFuncionarioModal } from '../components/modals/EditarFuncionarioModal';
import { ExcluirFuncionarioModal } from '../components/modals/ExcluirFuncionarioModal';
import { VisualizarFuncionarioModal } from '../components/modals/VisualizarFuncionarioModal';
import { funcionarioService } from '../services/funcionarioService';
import type { Funcionario, FuncionarioFormData, FuncionarioModalType } from '../types/funcionario';

export const FuncionariosPage: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModal, setActiveModal] = useState<FuncionarioModalType>(null);
  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null);
  const itemsPerPage = 6;

  const recarregar = async () => {
    try {
      setLoading(true);
      setError(null);
      setFuncionarios(await funcionarioService.list());
    } catch (err) {
      console.error('Erro ao carregar funcionários:', err);
      setError('Não foi possível carregar a lista de funcionários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    funcionarioService
      .list()
      .then((data) => {
        if (isMounted) {
          setFuncionarios(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Erro ao carregar funcionários:', err);
        if (isMounted) {
          setError('Não foi possível carregar a lista de funcionários.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredFuncionarios = useMemo(() => funcionarios.filter((funcionario) => {
    const matchesStatus = statusFilter === 'TODOS' || funcionario.status.toUpperCase() === statusFilter;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term
      || String(funcionario.id).includes(term)
      || String(funcionario.id).padStart(3, '0').includes(term)
      || funcionario.nome.toLowerCase().includes(term)
      || funcionario.cargo.toLowerCase().includes(term)
      || funcionario.email.toLowerCase().includes(term)
      || funcionario.departamento.toLowerCase().includes(term)
      || funcionario.cidade.toLowerCase().includes(term)
      || funcionario.status.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  }), [funcionarios, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredFuncionarios.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedFuncionarios = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return filteredFuncionarios.slice(start, start + itemsPerPage);
  }, [filteredFuncionarios, safeCurrentPage]);

  const closeModal = () => {
    setActiveModal(null);
    setSelectedFuncionario(null);
  };

  const createFuncionario = async (data: FuncionarioFormData) => {
    try {
      const created = await funcionarioService.create(data);
      setFuncionarios((previous) => [created, ...previous]);
    } catch (err) {
      console.error('Erro ao cadastrar funcionário:', err);
      alert('Erro ao cadastrar funcionário. Verifique os dados informados.');
    }
  };

  const editFuncionario = async (id: number, data: FuncionarioFormData) => {
    try {
      const updated = await funcionarioService.update(id, data);
      setFuncionarios((previous) => previous.map((funcionario) => funcionario.id === id ? updated : funcionario));
    } catch (err) {
      console.error('Erro ao atualizar funcionário:', err);
      alert('Erro ao atualizar funcionário.');
    }
  };

  const deleteFuncionario = async (id: number) => {
    try {
      await funcionarioService.delete(id);
      setFuncionarios((previous) => previous.filter((funcionario) => funcionario.id !== id));
    } catch (err) {
      console.error('Erro ao excluir funcionário:', err);
      alert('Erro ao excluir funcionário.');
    }
  };

  return (
    <>
      <PageContainer
        title="Funcionários"
        subtitle="Acompanhe e gerencie o quadro de colaboradores da empresa."
        actionButton={<button type="button" className="btn-new-candidate" onClick={() => setActiveModal('cadastrar')}>+ Novo funcionário</button>}
        filters={<>
          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input type="text" className="search-input" placeholder="Buscar por ID, nome, cargo ou status" value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); setCurrentPage(1); }} />
          </div>
          <div className="filter-select-wrapper">
            <select className="filter-select" value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setCurrentPage(1); }}>
              <option value="TODOS">Status: todos</option>
              <option value="ATIVO">ATIVO</option>
              <option value="INATIVO">INATIVO</option>
            </select>
            <span className="select-arrow">⌄</span>
          </div>
        </>}
        totalCountText={`${filteredFuncionarios.length} ${filteredFuncionarios.length === 1 ? 'funcionário' : 'funcionários'}`}
      >
        {error ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-danger)' }}>
            <p>{error}</p>
            <button type="button" className="btn-modal btn-cancel" style={{ marginTop: '12px' }} onClick={recarregar}>Tentar novamente</button>
          </div>
        ) : loading && funcionarios.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>Carregando funcionários...</div>
        ) : (
          <FuncionarioTable
            funcionarios={paginatedFuncionarios}
            onView={(funcionario) => { setSelectedFuncionario(funcionario); setActiveModal('visualizar'); }}
            onEdit={(funcionario) => { setSelectedFuncionario(funcionario); setActiveModal('editar'); }}
            onDelete={(funcionario) => { setSelectedFuncionario(funcionario); setActiveModal('excluir'); }}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </PageContainer>

      <CadastrarFuncionarioModal isOpen={activeModal === 'cadastrar'} onClose={closeModal} onSubmit={createFuncionario} />
      <VisualizarFuncionarioModal isOpen={activeModal === 'visualizar'} onClose={closeModal} funcionario={selectedFuncionario} />
      <EditarFuncionarioModal isOpen={activeModal === 'editar'} onClose={closeModal} funcionario={selectedFuncionario} onSubmit={editFuncionario} />
      <ExcluirFuncionarioModal isOpen={activeModal === 'excluir'} onClose={closeModal} funcionario={selectedFuncionario} onConfirm={deleteFuncionario} />
    </>
  );
};
