package com.example.FinalIntegradorBackEnd.services;

import com.example.FinalIntegradorBackEnd.dto.PacienteDto;
import com.example.FinalIntegradorBackEnd.dto.TurnoDto;
import com.example.FinalIntegradorBackEnd.entities.Paciente;
import com.example.FinalIntegradorBackEnd.entities.Turno;
import com.example.FinalIntegradorBackEnd.repository.PacienteRepository;
import com.example.FinalIntegradorBackEnd.repository.TurnoRepository;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TurnoService {

    @Autowired
    private TurnoRepository repository;

    public Turno registrarTurno (Turno turno){

          return repository.save(turno);

    }

    public List<TurnoDto> listarTurno(){
        List<Turno> listaTurnos = repository.findAll();

        ObjectMapper mapper= new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS,false);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);

        return listaTurnos.stream().map(turno -> mapper.convertValue(turno, TurnoDto.class)).collect(Collectors.toList());
    }

    public Optional<TurnoDto> buscarTurno(Integer id) {
        Optional turno = repository.findById(id);

        ObjectMapper mapper= new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS,false);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);


        if (turno.isPresent()) {
            return turno.stream().map(t->mapper.convertValue(t, TurnoDto.class)).findFirst();
        } else {
            return null;
        }
    }

    public boolean eliminarTurno(Integer id) {
        repository.deleteById(id);
        return true;
    }

    public Turno actualizarTurno(Turno turno) {
        return repository.save(turno);
    }

}
