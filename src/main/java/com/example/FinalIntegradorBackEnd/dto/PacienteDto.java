package com.example.FinalIntegradorBackEnd.dto;

import jakarta.persistence.criteria.CriteriaBuilder;

public class PacienteDto {

    private Integer id;
    private String nombreDTO;
    private String apellidoDTO;


    public PacienteDto() {
    }

    public PacienteDto(String nombre, String apellido) {
        this.nombreDTO = nombre;
        this.apellidoDTO = apellido;
    }


    public Integer getId() {
        return id;
    }

    public String getNombre() {
        return nombreDTO;
    }

    public String getApellido() {
        return apellidoDTO;
    }


    public void setId(Integer id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombreDTO = nombre;
    }

    public void setApellido(String apellido) {
        this.apellidoDTO = apellido;
    }
}
