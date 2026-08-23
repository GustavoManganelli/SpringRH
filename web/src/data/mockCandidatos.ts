import type { Candidato } from '../types/candidato';

export const INITIAL_CANDIDATOS: Candidato[] = [
  {
    id: 1,
    nome: 'Michael Jackson',
    email: 'ana.lima@email.com',
    telefone: '(11) 98765-4321',
    cargo: 'Analista de Dados',
    departamentoVaga: 'Risco',
    cidade: 'São Paulo',
    status: 'EM ANÁLISE',
    pretencaoSalarial: 6500,
    dataInscricao: '2026-08-01',
    dataEntrevista: '2026-08-10'
  },
  {
    id: 2,
    nome: 'Axl Rose',
    email: 'bruno.ferreira@email.com',
    telefone: '(11) 91234-5678',
    cargo: 'Dev Back-end Jr.',
    departamentoVaga: 'Tecnologia',
    cidade: 'Osasco',
    status: 'APROVADO',
    pretencaoSalarial: 4800,
    dataInscricao: '2026-08-03',
    dataEntrevista: '2026-08-12'
  },
  {
    id: 3,
    nome: 'Taylor Swift',
    email: 'camila.souza@email.com',
    telefone: '(11) 99887-7665',
    cargo: 'Product Designer',
    departamentoVaga: 'Produto',
    cidade: 'São Paulo',
    status: 'CONTRATADO',
    pretencaoSalarial: 8200,
    dataInscricao: '2026-07-28',
    dataEntrevista: '2026-08-05'
  },
  {
    id: 4,
    nome: 'Ebony',
    email: 'diego.martins@email.com',
    telefone: '(11) 97766-5544',
    cargo: 'Analista de CRM',
    departamentoVaga: 'Marketing',
    cidade: 'Barueri',
    status: 'EM ANÁLISE',
    pretencaoSalarial: 5500,
    dataInscricao: '2026-08-05',
    dataEntrevista: '2026-08-14'
  },
  {
    id: 5,
    nome: 'Yago',
    email: 'fernanda.alves@email.com',
    telefone: '(11) 96655-4433',
    cargo: 'Analista Financeiro',
    departamentoVaga: 'Financeiro',
    cidade: 'Carapicuíba',
    status: 'REPROVADO',
    pretencaoSalarial: 5000,
    dataInscricao: '2026-08-02',
    dataEntrevista: '2026-08-08'
  },
  {
    id: 6,
    nome: 'Julia',
    email: 'gabriel.rocha@email.com',
    telefone: '(11) 95544-3322',
    cargo: 'Dev Front-end Jr.',
    departamentoVaga: 'Tigrinho',
    cidade: 'São Paulo',
    status: 'APROVADO',
    pretencaoSalarial: 4800,
    dataInscricao: '2026-08-07',
    dataEntrevista: '2026-08-15'
  }
];
