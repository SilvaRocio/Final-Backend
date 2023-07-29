package com.example.FinalIntegradorBackEnd.services;

import com.example.FinalIntegradorBackEnd.dto.OdontologoDto;
import com.example.FinalIntegradorBackEnd.dto.PacienteDto;
import com.example.FinalIntegradorBackEnd.entities.Odontologo;
import com.example.FinalIntegradorBackEnd.entities.Paciente;
import com.example.FinalIntegradorBackEnd.repository.OdontologoRepository;
import com.example.FinalIntegradorBackEnd.repository.PacienteRepository;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OdontologoService {

    @Autowired
    OdontologoRepository repository;

    public Odontologo registrarOdontologo (Odontologo odontologo){
        return repository.save(odontologo);
    }

    public List<OdontologoDto> listarOdontologos(){
        List<Odontologo> listaOdontologos= repository.findAll();

        ObjectMapper mapper= new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS,false);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);

        return listaOdontologos.stream().map(odontologo -> mapper.convertValue(odontologo, OdontologoDto.class)).collect(Collectors.toList());
    }

    public Optional<OdontologoDto> buscarOdontologo(Integer id) {
        Optional odontologo = repository.findById(id);

        ObjectMapper mapper= new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS,false);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);

        if (odontologo.isPresent()) {
            return odontologo.stream().map(o->mapper.convertValue(o, OdontologoDto.class)).findFirst();
        } else {
            return null;
        }
    }

    public Odontologo buscarOdontologoMatricula(String matricula) {
        Odontologo odontologo = repository.findOdontologoByMatricula(matricula);

//        ObjectMapper mapper= new ObjectMapper();
//        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS,false);
//        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);

    return odontologo;
    }

    public boolean eliminarOdontologo(Integer id) {
        repository.deleteById(id);
        return true;
    }

    public Odontologo actualizarOdontologo(Odontologo odontologo) {
        return repository.save(odontologo);
    }


}
