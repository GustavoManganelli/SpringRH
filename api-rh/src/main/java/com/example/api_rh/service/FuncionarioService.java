package com.example.api_rh.service;

import com.example.api_rh.model.Funcionario;
import com.example.api_rh.repository.FuncionarioRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class FuncionarioService extends BaseService<Funcionario> {

    private static final Set<String> STATUS_PERMITIDOS = Set.of(
            "ATIVO",
            "INATIVO"
    );

    public FuncionarioService(FuncionarioRepository repository) {
        super(repository);
    }

    @Override
    protected void validarStatus(String status) {
        if (status == null || !STATUS_PERMITIDOS.contains(status.trim().toUpperCase())) {
            throw new IllegalArgumentException(
                    "Status inválido para funcionário. Permitidos: ATIVO, INATIVO."
            );
        }
    }

    @Override
    protected void validarEntidade(Funcionario funcionario) {
        super.validarEntidade(funcionario);

        if (funcionario.getDepartamento() == null
                || funcionario.getDepartamento().trim().isEmpty()) {
            throw new IllegalArgumentException("O departamento é obrigatório.");
        }

        if (funcionario.getSalario() == null || funcionario.getSalario() < 0) {
            throw new IllegalArgumentException("O salário deve ser maior ou igual a zero.");
        }

        if (funcionario.getDataAdmissao() == null) {
            throw new IllegalArgumentException("A data de admissão é obrigatória.");
        }
    }
}
