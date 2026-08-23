import { api } from "../utils/api";
import type {
  Candidato,
  CandidatoFormData,
  CandidatoPatchData,
} from "../types/candidato";

export const candidatoService = {
  async list(): Promise<Candidato[]> {
    return api<Candidato[]>("candidatos", "GET");
  },

  async getById(id: number): Promise<Candidato> {
    return api<Candidato>(`candidatos/${id}`, "GET");
  },

  async create(data: CandidatoFormData): Promise<Candidato> {
    const payload = {
      ...data,
      pretencaoSalarial: data.pretencaoSalarial ?? 0,
      dataInscricao: data.dataInscricao || new Date().toISOString(),
    };
    return api<Candidato, typeof payload>("candidatos", "POST", payload);
  },

  async update(id: number, data: CandidatoFormData): Promise<Candidato> {
    const payload = {
      ...data,
      id,
      pretencaoSalarial: data.pretencaoSalarial ?? 0,
      dataInscricao: data.dataInscricao || new Date().toISOString(),
    };
    return api<Candidato, typeof payload>(`candidatos/${id}`, "PUT", payload);
  },

  async updateStatus(id: number, status: string): Promise<string> {
    return api<string>(
      `candidatos/${id}/status?status=${encodeURIComponent(status)}`,
      "PATCH",
    );
  },

  async patch(
    id: number,
    data: CandidatoPatchData,
    current: Candidato,
  ): Promise<Candidato> {
    if (data.status && !data.cargo && data.pretencaoSalarial === undefined) {
      await this.updateStatus(id, data.status);
      return { ...current, status: data.status };
    }

    const updated: CandidatoFormData = {
      ...current,
      cargo: data.cargo || current.cargo,
      status: data.status || current.status,
      pretencaoSalarial:
        data.pretencaoSalarial !== undefined
          ? data.pretencaoSalarial
          : current.pretencaoSalarial,
    };
    return this.update(id, updated);
  },

  async delete(id: number): Promise<string> {
    return api<string>(`candidatos/${id}`, "DELETE");
  },
};
