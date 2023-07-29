package com.example.FinalIntegradorBackEnd.controllers;

import com.example.FinalIntegradorBackEnd.dto.TurnoDto;
import com.example.FinalIntegradorBackEnd.entities.Paciente;
import com.example.FinalIntegradorBackEnd.entities.Turno;
import com.example.FinalIntegradorBackEnd.services.PacienteService;
import com.example.FinalIntegradorBackEnd.services.TurnoService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turnos")
public class TurnoController {

    @Autowired
    private TurnoService turnoService;

    private static final Logger logger = Logger.getLogger(TurnoController.class);

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarTurno(@RequestBody Turno turno){
        logger.info("Registrando turno...");
        ResponseEntity<String> respuesta = null;

        if(turnoService.registrarTurno(turno) != null){
            logger.info("Turno registrado con exito");
            respuesta = ResponseEntity.ok("El turno fue registrado con éxito");
        } else{
            logger.info("No se pudo registrar el turno");
            respuesta = ResponseEntity.internalServerError().body("No se pudo registrar el turno");
        }

        return respuesta;
    }

    @GetMapping("/listarTurno")
    public ResponseEntity<List<TurnoDto>> listarTurno(){
        logger.info("Listando turnos...");
        return ResponseEntity.ok(turnoService.listarTurno());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TurnoDto> buscarTurno(@PathVariable Integer id) {
        logger.info("Buscando turno id " + id + "...");
        Optional turno = turnoService.buscarTurno(id);

        if (turno.isPresent()) {
            logger.info("Turno encontrado");
            return ResponseEntity.ok((TurnoDto) turno.get());
        } else {
            logger.info("No se pudo encontrar el turno");
            return null;
        }

    }

    @PutMapping("/modificar")
    public ResponseEntity<Turno> actualizarTurno(@RequestBody Turno turno) {
        ResponseEntity<Turno> response = null;

        if (turno.getId() != null && turnoService.buscarTurno(turno.getId()).isPresent()) {
            logger.info("Turno modificado con exito");
            response = ResponseEntity.ok(turnoService.actualizarTurno(turno));
        } else {
            logger.info("No se pudo modificar el turno");
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarTurno(@PathVariable Integer id) {
        ResponseEntity<String> response = null;

        if (turnoService.buscarTurno(id).isPresent()) {
            turnoService.eliminarTurno(id);
            logger.info("Turno eliminado");
            response = ResponseEntity.ok("Eliminado");
        } else {
            logger.info("No se puedo eliminar el turno");
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }

}
