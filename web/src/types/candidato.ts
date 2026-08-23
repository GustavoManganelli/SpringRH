export type StatusCandidato = 'EM ANÁLISE' | 'APROVADO' | 'CONTRATADO' | 'REPROVADO' | string;

export interface Candidato {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  departamentoVaga: string;
  cidade: string;
  status: StatusCandidato;
  pretencaoSalarial?: number;
  dataInscricao?: string | Date;
  dataEntrevista?: string | Date;
}

export type ModalType = 'cadastrar' | 'visualizar' | 'editar' | 'atualizar' | 'excluir' | null;

export interface CandidatoFormData {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  departamentoVaga: string;
  pretencaoSalarial?: number;
  cidade: string;
  status: string;
  dataInscricao?: string | Date;
  dataEntrevista?: string | Date;
}

export interface CandidatoPatchData {
  cargo?: string;
  status?: string;
  pretencaoSalarial?: number;
}
