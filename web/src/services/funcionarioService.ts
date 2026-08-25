import { api } from '../utils/api';
import type { Funcionario, FuncionarioFormData } from '../types/funcionario';

export const funcionarioService = {
  list(): Promise<Funcionario[]> {
    return api<Funcionario[]>('funcionarios');
  },

  getById(id: number): Promise<Funcionario> {
    return api<Funcionario>(`funcionarios/${id}`);
  },

  create(data: FuncionarioFormData): Promise<Funcionario> {
    const payload = {
      ...data,
      salario: data.salario ?? 0,
      dataAdmissao: data.dataAdmissao || new Date().toISOString(),
    };
    return api<Funcionario, typeof payload>('funcionarios', 'POST', payload);
  },

  update(id: number, data: FuncionarioFormData): Promise<Funcionario> {
    const payload = {
      ...data,
      id: undefined,
      salario: data.salario ?? 0,
      dataAdmissao: data.dataAdmissao || new Date().toISOString(),
    };
    return api<Funcionario, typeof payload>(`funcionarios/${id}`, 'PUT', payload);
  },

  updateStatus(id: number, status: string): Promise<string> {
    return api<string>(
      `funcionarios/${id}/status?status=${encodeURIComponent(status)}`,
      'PATCH',
    );
  },

  delete(id: number): Promise<string> {
    return api<string>(`funcionarios/${id}`, 'DELETE');
  },
};
