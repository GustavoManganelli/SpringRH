package com.example.api_rh.service;

import java.util.List;
import java.util.regex.Pattern;

import com.example.api_rh.model.Pessoa;
import com.example.api_rh.repository.BaseRepository;

public abstract class BaseService<TModel extends Pessoa> {

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$"
    );

    protected final BaseRepository<TModel> repository;

    protected BaseService(BaseRepository<TModel> repository) {
        this.repository = repository;
    }

    public TModel criar(TModel entidade) {
        validarEntidade(entidade);
        entidade.setId(0);

        return repository.addModel(entidade);
    }

    public List<TModel> listar() {
        return repository.getAllModels();
    }

    public TModel buscarPorId(int id) {
        validarId(id);
        TModel entidade = repository.getModelById(id);

        if (entidade == null) {
            throw new RuntimeException("Registro não encontrado.");
        }

        return entidade;
    }

    public TModel atualizar(int id, TModel entidade) {
        validarId(id);
        validarEntidade(entidade);
        buscarPorId(id);

        entidade.setId(id);
        return repository.updateModel(id, entidade);
    }

    public TModel atualizarStatus(int id, String status) {
        validarId(id);
        validarTexto(status, "status");
        validarStatus(status);
        buscarPorId(id);
        return repository.updateStatus(id, status);
    }

    public boolean deletar(int id) {
        validarId(id);
        buscarPorId(id);
        repository.deleteModel(id);
        return repository.getModelById(id) == null;
    }

    protected void validarEntidade(TModel entidade) {
        if (entidade == null) {
            throw new IllegalArgumentException("O corpo da requisição não pode ser nulo.");
        }

        validarTexto(entidade.getNome(), "nome");
        validarTexto(entidade.getEmail(), "email");
        validarTexto(entidade.getTelefone(), "telefone");
        validarTexto(entidade.getCargo(), "cargo");
        validarTexto(entidade.getCidade(), "cidade");
        validarTexto(entidade.getStatus(), "status");
        validarStatus(entidade.getStatus());

        if (!EMAIL_PATTERN.matcher(entidade.getEmail().trim()).matches()) {
            throw new IllegalArgumentException("O e-mail informado é inválido.");
        }

        validarTelefone(entidade.getTelefone());
    }

    private void validarTelefone(String telefone) {
        String apenasDigitos = telefone.replaceAll("\\D", "");
        if (apenasDigitos.length() < 10 || apenasDigitos.length() > 11) {
            throw new IllegalArgumentException("O telefone deve conter 10 ou 11 dígitos (incluindo DDD).");
        }
    }

    protected abstract void validarStatus(String status);

    private void validarTexto(String valor, String campo) {
        if (valor == null || valor.trim().isEmpty()) {
            throw new IllegalArgumentException("O campo " + campo + " é obrigatório.");
        }
    }

    private void validarId(int id) {
        if (id <= 0) {
            throw new IllegalArgumentException("O ID deve ser maior que zero.");
        }
    }
}
