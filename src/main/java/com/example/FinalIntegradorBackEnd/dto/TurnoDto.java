package com.example.FinalIntegradorBackEnd.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.sql.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TurnoDto implements Serializable {

    private Integer id;
    @JsonProperty("paciente")
    private PacienteDto pacienteDto;

    @JsonProperty("odontologo")
    private OdontologoDto odontologoDto;
    private Date fechaHoraDTO;


    public TurnoDto() {
    }

    public TurnoDto(PacienteDto pacienteDto, OdontologoDto odontologoDto, Date fechaHora) {
        this.pacienteDto = pacienteDto;
        this.odontologoDto = odontologoDto;
        this.fechaHoraDTO = fechaHora;
    }


    public Integer getId() {
        return id;
    }

    public PacienteDto getPacienteDto() {
        return pacienteDto;
    }

    public OdontologoDto getOdontologoDto() {
        return odontologoDto;
    }

    public Date getFechaHora() {
        return fechaHoraDTO;
    }


    public void setId(Integer id) {
        this.id = id;
    }

    public void setPacienteDto(PacienteDto pacienteDto) {
        this.pacienteDto = pacienteDto;
    }

    public void setOdontologoDto(OdontologoDto odontologoDto) {
        this.odontologoDto = odontologoDto;
    }

    public void setFechaHora(Date fechaHora) {
        this.fechaHoraDTO = fechaHora;
    }
}
