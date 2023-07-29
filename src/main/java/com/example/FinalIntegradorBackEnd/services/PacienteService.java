package com.example.FinalIntegradorBackEnd.services;

import com.example.FinalIntegradorBackEnd.dto.PacienteDto;
import com.example.FinalIntegradorBackEnd.entities.Paciente;
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
public class PacienteService {

    @Autowired
    PacienteRepository repository;

    public Paciente registrarPaciente (Paciente paciente){
        return repository.save(paciente);
    }

    public List<PacienteDto> listarPacientes(){
        List<Paciente> listaPacientes= repository.findAll();

        ObjectMapper mapper= new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS,false);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);

        return listaPacientes.stream().map(paciente -> mapper.convertValue(paciente, PacienteDto.class)).collect(Collectors.toList());
    }

    public Optional<PacienteDto> buscarPaciente(Integer id) {
        Optional paciente = repository.findById(id);

        ObjectMapper mapper= new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS,false);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);

        if (paciente.isPresent()) {
            return paciente.stream().map(p->mapper.convertValue(p, PacienteDto.class)).findFirst();
        } else {
            return null;
        }

    }

    public Paciente buscarPacienteDni(String dni) {
        Paciente paciente = repository.findPacienteByDni(dni);

//        ObjectMapper mapper= new ObjectMapper();
//        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS,false);
//        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);

        return paciente;
    }

    public boolean eliminarPaciente(Integer id) {
        repository.deleteById(id);
        return true;
    }

    public Paciente actualizarPaciente(Paciente paciente) {
        return repository.save(paciente);
    }

}
