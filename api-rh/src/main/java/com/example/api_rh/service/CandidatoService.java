package com.example.api_rh.service;

import com.example.api_rh.model.Candidato;
import org.springframework.stereotype.Service;

import com.example.api_rh.repository.CandidatoRepository;

import java.util.Set;

@Service
public class CandidatoService extends BaseService<Candidato> {

    private static final Set<String> STATUS_PERMITIDOS = Set.of(
            "EM ANÁLISE",
            "EM ANALISE",
            "APROVADO",
            "CONTRATADO",
            "REPROVADO"
    );

    public CandidatoService(CandidatoRepository repository) {
        super(repository);
    }

    @Override
    protected void validarStatus(String status) {
        if (status == null || !STATUS_PERMITIDOS.contains(status.trim().toUpperCase())) {
            throw new IllegalArgumentException(
                    "Status inválido para candidato. Permitidos: EM ANÁLISE, APROVADO, CONTRATADO, REPROVADO."
            );
        }
    }

    @Override
    protected void validarEntidade(Candidato candidato) {
        super.validarEntidade(candidato);

        if (candidato.getDepartamentoVaga() == null
                || candidato.getDepartamentoVaga().trim().isEmpty()) {
            throw new IllegalArgumentException("O departamento da vaga é obrigatório.");
        }

        if (candidato.getPretencaoSalarial() == null
                || candidato.getPretencaoSalarial() < 0) {
            throw new IllegalArgumentException("A pretensão salarial deve ser maior ou igual a zero.");
        }

        if (candidato.getDataInscricao() == null) {
            throw new IllegalArgumentException("A data de inscrição é obrigatória.");
        }

        if (candidato.getDataEntrevista() != null
                && candidato.getDataEntrevista().before(candidato.getDataInscricao())) {
            throw new IllegalArgumentException(
                    "A data da entrevista não pode ser anterior à data de inscrição."
            );
        }
    }
}
