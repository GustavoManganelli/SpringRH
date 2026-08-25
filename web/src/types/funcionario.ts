export type StatusFuncionario = 'ATIVO' | 'INATIVO' | string;

export interface Funcionario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  departamento: string;
  cidade: string;
  status: StatusFuncionario;
  salario?: number;
  dataAdmissao?: string | Date;
}

export type FuncionarioModalType = 'cadastrar' | 'visualizar' | 'editar' | 'excluir' | null;

export interface FuncionarioFormData {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  departamento: string;
  salario?: number;
  cidade: string;
  status: string;
  dataAdmissao?: string | Date;
}
