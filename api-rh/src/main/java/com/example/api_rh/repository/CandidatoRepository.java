package com.example.api_rh.repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.api_rh.model.Candidato;

@Repository
public class CandidatoRepository extends BaseRepository<Candidato> {

    static List<Candidato> candidatos = new ArrayList<>();

    static {
        candidatos.add(new Candidato("Michael Jackson", "ana.lima@email.com", "(11) 98765-4321", "Analista de Dados", "Risco", 6500.0, "São Paulo", "EM ANÁLISE", new Date(), new Date()));
        candidatos.add(new Candidato("Axl Rose", "bruno.ferreira@email.com", "(11) 91234-5678", "Dev Back-end Jr.", "Tecnologia", 4800.0, "Osasco", "APROVADO", new Date(), new Date()));
        candidatos.add(new Candidato("Taylor Swift", "camila.souza@email.com", "(11) 99887-7665", "Product Designer", "Produto", 8200.0, "São Paulo", "CONTRATADO", new Date(), new Date()));
        candidatos.add(new Candidato("Ebony", "diego.martins@email.com", "(11) 97766-5544", "Analista de CRM", "Marketing", 5500.0, "Barueri", "EM ANÁLISE", new Date(), new Date()));
        candidatos.add(new Candidato("Yago", "fernanda.alves@email.com", "(11) 96655-4433", "Analista Financeiro", "Financeiro", 5000.0, "Carapicuíba", "REPROVADO", new Date(), new Date()));
        candidatos.add(new Candidato("Julia", "gabriel.rocha@email.com", "(11) 95544-3322", "Dev Front-end Jr.", "Tigrinho", 4800.0, "São Paulo", "APROVADO", new Date(), new Date()));
    }

    public CandidatoRepository() {
        for (Candidato candidato : candidatos) {
            this.addModel(candidato);
        }
    }
}
