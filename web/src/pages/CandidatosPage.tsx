import React, { useState, useEffect, useMemo } from 'react';
import { PageContainer } from '../components/PageContainer';
import { CandidateTable } from '../components/CandidateTable';
import { CadastrarModal } from '../components/modals/CadastrarModal';
import { VisualizarModal } from '../components/modals/VisualizarModal';
import { EditarModal } from '../components/modals/EditarModal';
import { AtualizarModal } from '../components/modals/AtualizarModal';
import { ExcluirModal } from '../components/modals/ExcluirModal';
import { candidatoService } from '../services/candidatoService';
import type {
  Candidato,
  ModalType,
  CandidatoFormData,
  CandidatoPatchData,
} from '../types/candidato';

export const CandidatosPage: React.FC = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidato | null>(null);

  useEffect(() => {
    let isMounted = true;
    candidatoService
      .list()
      .then((data) => {
        if (isMounted) {
          setCandidatos(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Erro ao carregar candidatos:', err);
          setError('Não foi possível carregar a lista de candidatos.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const recarregar = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await candidatoService.list();
      setCandidatos(data);
    } catch (err) {
      console.error('Erro ao carregar candidatos:', err);
      setError('Não foi possível carregar a lista de candidatos.');
    } finally {
      setLoading(false);
    }
  };

  const filteredCandidatos = useMemo(() => {
    return candidatos.filter((c) => {
      const matchesStatus =
        statusFilter === 'TODOS' ||
        c.status.toUpperCase() === statusFilter.toUpperCase();

      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        String(c.id).includes(term) ||
        String(c.id).padStart(3, '0').includes(term) ||
        c.nome.toLowerCase().includes(term) ||
        c.cargo.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        (c.departamentoVaga && c.departamentoVaga.toLowerCase().includes(term)) ||
        (c.cidade && c.cidade.toLowerCase().includes(term)) ||
        c.status.toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [candidatos, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCandidatos.length / itemsPerPage));
  const paginatedCandidatos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCandidatos.slice(start, start + itemsPerPage);
  }, [filteredCandidatos, currentPage, itemsPerPage]);

  const handleOpenCadastrar = () => {
    setSelectedCandidate(null);
    setActiveModal('cadastrar');
  };

  const handleOpenVisualizar = (candidato: Candidato) => {
    setSelectedCandidate(candidato);
    setActiveModal('visualizar');
  };

  const handleOpenEditar = (candidato: Candidato) => {
    setSelectedCandidate(candidato);
    setActiveModal('editar');
  };

  const handleOpenExcluir = (candidato: Candidato) => {
    setSelectedCandidate(candidato);
    setActiveModal('excluir');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedCandidate(null);
  };

  const handleCreateCandidato = async (data: CandidatoFormData) => {
    try {
      const created = await candidatoService.create(data);
      setCandidatos((prev) => [created, ...prev]);
    } catch (err) {
      console.error('Erro ao cadastrar candidato:', err);
      alert('Erro ao cadastrar candidato. Verifique os dados informados.');
    }
  };

  const handleEditCandidato = async (id: number, data: CandidatoFormData) => {
    try {
      const updated = await candidatoService.update(id, data);
      setCandidatos((prev) =>
        prev.map((c) => (c.id === id ? updated : c))
      );
    } catch (err) {
      console.error('Erro ao atualizar candidato:', err);
      alert('Erro ao atualizar candidato.');
    }
  };

  const handlePatchCandidato = async (id: number, data: CandidatoPatchData) => {
    if (!selectedCandidate) return;
    try {
      const updated = await candidatoService.patch(id, data, selectedCandidate);
      setCandidatos((prev) =>
        prev.map((c) => (c.id === id ? updated : c))
      );
    } catch (err) {
      console.error('Erro ao atualizar dados parciais do candidato:', err);
      alert('Erro ao atualizar candidato.');
    }
  };

  const handleDeleteCandidato = async (id: number) => {
    try {
      await candidatoService.delete(id);
      setCandidatos((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Erro ao excluir candidato:', err);
      alert('Erro ao excluir candidato.');
    }
  };

  return (
    <>
      <PageContainer
        title="Candidatos"
        subtitle="Acompanhe e gerencie as pessoas do processo seletivo."
        actionButton={
          <button
            type="button"
            className="btn-new-candidate"
            onClick={handleOpenCadastrar}
          >
            + Novo candidato
          </button>
        }
        filters={
          <>
            <div className="search-box">
              <span className="search-icon">⌕</span>
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por ID, nome, cargo ou status"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="filter-select-wrapper">
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="TODOS">Status: todos</option>
                <option value="EM ANÁLISE">EM ANÁLISE</option>
                <option value="APROVADO">APROVADO</option>
                <option value="CONTRATADO">CONTRATADO</option>
                <option value="REPROVADO">REPROVADO</option>
              </select>
              <span className="select-arrow">⌄</span>
            </div>
          </>
        }
        totalCountText={`${filteredCandidatos.length} ${
          filteredCandidatos.length === 1 ? 'candidato' : 'candidatos'
        }`}
      >
        {error ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-danger)' }}>
            <p>{error}</p>
            <button
              type="button"
              className="btn-modal btn-cancel"
              style={{ marginTop: '12px' }}
              onClick={recarregar}
            >
              Tentar novamente
            </button>
          </div>
        ) : loading && candidatos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
            Carregando candidatos...
          </div>
        ) : (
          <CandidateTable
            candidatos={paginatedCandidatos}
            onView={handleOpenVisualizar}
            onEdit={handleOpenEditar}
            onDelete={handleOpenExcluir}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </PageContainer>

      <CadastrarModal
        isOpen={activeModal === 'cadastrar'}
        onClose={handleCloseModal}
        onSubmit={handleCreateCandidato}
      />

      <VisualizarModal
        isOpen={activeModal === 'visualizar'}
        onClose={handleCloseModal}
        candidato={selectedCandidate}
      />

      <EditarModal
        isOpen={activeModal === 'editar'}
        onClose={handleCloseModal}
        candidato={selectedCandidate}
        onSubmit={handleEditCandidato}
      />

      <AtualizarModal
        isOpen={activeModal === 'atualizar'}
        onClose={handleCloseModal}
        candidato={selectedCandidate}
        onSubmit={handlePatchCandidato}
      />

      <ExcluirModal
        isOpen={activeModal === 'excluir'}
        onClose={handleCloseModal}
        candidato={selectedCandidate}
        onConfirm={handleDeleteCandidato}
      />
    </>
  );
};
