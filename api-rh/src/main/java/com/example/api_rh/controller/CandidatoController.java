package com.example.api_rh.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api_rh.model.Candidato;
import com.example.api_rh.service.CandidatoService;

@RestController
@RequestMapping("/candidatos")
public class CandidatoController extends BaseController<Candidato> {

    public CandidatoController(CandidatoService service) {
        super(service);
    }
}
