package com.example.FinalIntegradorBackEnd.controllers;

import com.example.FinalIntegradorBackEnd.dto.PacienteDto;
import com.example.FinalIntegradorBackEnd.entities.Paciente;
import com.example.FinalIntegradorBackEnd.services.PacienteService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    private static final Logger logger = Logger.getLogger(PacienteController.class);

    @Autowired
    PacienteService pacienteService;

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarPaciente(@RequestBody Paciente paciente){
        logger.info("Registrando paciente...");
        ResponseEntity<String> respuesta = null;

        if(pacienteService.registrarPaciente(paciente) != null){
            logger.info("El paciente fue registrado con éxito");
            respuesta = ResponseEntity.ok("El paciente fue registrado con éxito");
        } else{
            logger.info("No se pudo registrar el paciente");
            respuesta = ResponseEntity.internalServerError().body("No se pudo registrar el paciente");
        }

        return respuesta;
    }

    @GetMapping("/listarPacientes")
    public ResponseEntity<List<PacienteDto>> listarPacientes(){
        logger.info("Listando pacientes...");
        return ResponseEntity.ok(pacienteService.listarPacientes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PacienteDto> buscarPaciente(@PathVariable Integer id) {
        logger.info("Buscando paciente...");
        Optional paciente = pacienteService.buscarPaciente(id);

        if (paciente.isPresent()) {
            logger.info("Paciente encontrado!");
            return ResponseEntity.ok((PacienteDto) paciente.get());
        } else {
            logger.info("No se pudo encontrar al paciente");
            return null;
        }
    }

    @GetMapping("buscarpordni/{dni}")
    public ResponseEntity<Paciente> buscarPacienteDni(@PathVariable String dni) {
        logger.info("Buscando paciente con el dni " + dni + "...");
        Paciente paciente = pacienteService.buscarPacienteDni(dni);
        return ResponseEntity.ok(paciente);
    }

    @PutMapping("/modificar")
    public ResponseEntity<Paciente> actualizarPaciente(@RequestBody Paciente paciente) {
        ResponseEntity<Paciente> response = null;

        if (paciente.getId() != null && pacienteService.buscarPaciente(paciente.getId()).isPresent()) {
            logger.info("Paciente modificado con exito");
            response = ResponseEntity.ok(pacienteService.actualizarPaciente(paciente));
        } else {
            logger.info("No se pudo modificar al paciente");
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarPaciente(@PathVariable Integer id) {
        ResponseEntity<String> response = null;

        if (pacienteService.buscarPaciente(id).isPresent()) {
            logger.info("Paciente eliminado");
            pacienteService.eliminarPaciente(id);
            response = ResponseEntity.ok("Eliminado");
        } else {
            logger.info("No se pudo eliminar al paciente");
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }
}
