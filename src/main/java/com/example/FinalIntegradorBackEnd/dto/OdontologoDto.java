package com.example.FinalIntegradorBackEnd.dto;

public class OdontologoDto {

    private Integer idDTO;
    private String nombreDTO;
    private String apellidoDTO;


    public OdontologoDto() {
    }

    public OdontologoDto(String nombre, String apellido) {
        this.nombreDTO = nombre;
        this.apellidoDTO = apellido;
    }


    public Integer getId() {
        return idDTO;
    }

    public String getNombre() {
        return nombreDTO;
    }

    public String getApellido() {
        return apellidoDTO;
    }


    public void setId(Integer id) {
        this.idDTO = id;
    }

    public void setNombre(String nombre) {
        this.nombreDTO = nombre;
    }

    public void setApellido(String apellido) {
        this.apellidoDTO = apellido;
    }
}
