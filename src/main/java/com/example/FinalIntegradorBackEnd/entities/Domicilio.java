package com.example.FinalIntegradorBackEnd.entities;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;

@Entity
@Table
public class Domicilio {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String calle;
    private Integer altura;
    private String localidad;



    public Domicilio() {
    }

    public Domicilio(String calle, Integer altura, String localidad) {
        this.calle = calle;
        this.altura = altura;
        this.localidad = localidad;
    }


    public Integer getId() {
        return id;
    }

    public String getCalle() {
        return calle;
    }

    public Integer getAltura() {
        return altura;
    }

    public String getLocalidad() {
        return localidad;
    }


    public void setId(Integer id) {
        this.id = id;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public void setAltura(Integer altura) {
        this.altura = altura;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }
}
