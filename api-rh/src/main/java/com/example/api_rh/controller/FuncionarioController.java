package com.example.api_rh.controller;

import com.example.api_rh.model.Funcionario;
import com.example.api_rh.service.FuncionarioService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController extends BaseController<Funcionario> {

    public FuncionarioController(FuncionarioService service) {
        super(service);
    }
}
