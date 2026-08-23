package com.example.api_rh.model;

import java.util.Date;

public class Funcionario extends Pessoa{
    private String departamento;
    private Date dataAdmissao;
    private Double salario;


    public Funcionario() {
    }

    public Funcionario(String nome, String email, String telefone, String cargo, String departamento, Double salario, String cidade, String status, Date dataAdmissao, Date dataEntrevista) {
        super(nome, email, telefone, cargo, cidade, status);
        this.dataAdmissao = dataAdmissao;
        this.salario = salario;
        this.departamento = departamento;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public Date getDataAdmissao() {
        return dataAdmissao;
    }

    public void setDataAdmissao(Date dataAdmissao) {
        this.dataAdmissao = dataAdmissao;
    }

    public Double getSalario() {
        return salario;
    }

    public void setSalario(Double salario) {
        this.salario = salario;
    }
}
