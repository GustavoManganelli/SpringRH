package com.example.api_rh.controller;

import java.util.List;

import com.example.api_rh.model.Pessoa;
import com.example.api_rh.service.BaseService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

public abstract class BaseController<TModel extends Pessoa> {

    protected final BaseService<TModel> service;

    protected BaseController(BaseService<TModel> service) {
        this.service = service;
    }

    @PostMapping
    public TModel criar(@RequestBody TModel entidade) {
        return service.criar(entidade);
    }

    @GetMapping
    public List<TModel> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public TModel buscarPorId(@PathVariable int id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public TModel atualizar(@PathVariable int id, @RequestBody TModel entidade) {
        return service.atualizar(id, entidade);
    }

    @PatchMapping("/{id}/status")
    public String atualizarStatus(@PathVariable int id, @RequestParam String status) {
        return "Novo status: " + service.atualizarStatus(id, status).getStatus();
    }

    @DeleteMapping("/{id}")
    public String deletar(@PathVariable int id) {
        return service.deletar(id) ? "Usuario deletado com sucesso!" : "Não foi possível deletar o usuário.";
    }
}
