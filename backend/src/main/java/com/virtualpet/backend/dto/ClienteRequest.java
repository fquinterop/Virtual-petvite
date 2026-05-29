package com.virtualpet.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class ClienteRequest {
    @JsonAlias("name")   // acepta tanto "nombre" como "name" del frontend
    private String nombre;
    private String email;
    private String password;
    private String telefono;
    private String direccion;
}