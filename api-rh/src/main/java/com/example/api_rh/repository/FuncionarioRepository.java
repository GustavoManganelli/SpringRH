package com.example.api_rh.repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.api_rh.model.Funcionario;

@Repository
public class FuncionarioRepository extends BaseRepository<Funcionario> {

    static List<Funcionario> funcionarios = new ArrayList<>();

    static {
        funcionarios.add(new Funcionario("Carlos Silva", "carlos.silva@picpay.com", "(11) 91111-2222", "Tech Lead", "Tecnologia", 14500.0, "São Paulo", "ATIVO", new Date(), new Date()));
        funcionarios.add(new Funcionario("Mariana Santos", "mariana.santos@picpay.com", "(11) 92222-3333", "Gerente de Produto", "Produto", 16000.0, "São Paulo", "ATIVO", new Date(), new Date()));
        funcionarios.add(new Funcionario("Lucas Oliveira", "lucas.oliveira@picpay.com", "(11) 93333-4444", "Dev Back-end Senior", "Tecnologia", 12000.0, "Osasco", "ATIVO", new Date(), new Date()));
        funcionarios.add(new Funcionario("Beatriz Costa", "beatriz.costa@picpay.com", "(11) 94444-5555", "Analista de RH Pleno", "Recursos Humanos", 7500.0, "Barueri", "ATIVO", new Date(), new Date()));
        funcionarios.add(new Funcionario("Rodrigo Pereira", "rodrigo.pereira@picpay.com", "(11) 95555-6666", "Engenheiro de Dados", "Dados & Analytics", 11000.0, "São Paulo", "ATIVO", new Date(), new Date()));
    }

    public FuncionarioRepository() {
        for (Funcionario funcionario : funcionarios) {
            this.addModel(funcionario);
        }
    }
}
