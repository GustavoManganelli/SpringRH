package com.example.api_rh.service;

import com.example.api_rh.model.Candidato;
import org.springframework.stereotype.Service;

import com.example.api_rh.repository.CandidatoRepository;

@Service
public class CandidatoService extends BaseService<Candidato> {

    public CandidatoService(CandidatoRepository repository) {
        super(repository);
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
