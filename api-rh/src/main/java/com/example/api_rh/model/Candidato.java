package com.example.api_rh.model;

import java.util.Date;

public class Candidato extends Pessoa {
    private String departamentoVaga;
    private Date dataInscricao;
    private Date dataEntrevista;
    private Double pretencaoSalarial;


    public Candidato() {
    }

    public Candidato(String nome, String email, String telefone, String cargo, String departamentoVaga, Double pretencaoSalarial, String cidade, String status, Date dataInscricao, Date dataEntrevista) {
        super(nome, email, telefone, cargo, cidade, status);
        this.departamentoVaga = departamentoVaga;
        this.pretencaoSalarial = pretencaoSalarial;
        this.dataInscricao = dataInscricao;
        this.dataEntrevista = dataEntrevista;
    }

    public String getDepartamentoVaga() {
        return departamentoVaga;
    }

    public void setDepartamentoVaga(String departamentoVaga) {
        this.departamentoVaga = departamentoVaga;
    }

    public Double getPretencaoSalarial() {
        return pretencaoSalarial;
    }

    public void setPretencaoSalarial(Double pretencaoSalarial) {
        this.pretencaoSalarial = pretencaoSalarial;
    }

    public Date getDataInscricao() {
        return dataInscricao;
    }

    public void setDataInscricao(Date dataInscricao) {
        this.dataInscricao = dataInscricao;
    }

    public Date getDataEntrevista() {
        return dataEntrevista;
    }

    public void setDataEntrevista(Date dataEntrevista) {
        this.dataEntrevista = dataEntrevista;
    }
}