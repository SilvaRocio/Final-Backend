package com.example.FinalIntegradorBackEnd.controllers;

import com.example.FinalIntegradorBackEnd.dto.OdontologoDto;
import com.example.FinalIntegradorBackEnd.entities.Odontologo;
import com.example.FinalIntegradorBackEnd.entities.Paciente;
import com.example.FinalIntegradorBackEnd.services.OdontologoService;
import com.example.FinalIntegradorBackEnd.services.PacienteService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/odontologos")
public class OdontologoController {

    private static final Logger logger = Logger.getLogger(OdontologoController.class);

    @Autowired
    OdontologoService odontologoService;

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarOdontologo(@RequestBody Odontologo odontologo){
        logger.info("Registrando odontologo...");
        ResponseEntity<String> respuesta = null;

        if(odontologoService.registrarOdontologo(odontologo) != null){
            logger.info("El odontologo fue registrado con éxito");
            respuesta = ResponseEntity.ok("El odontologo fue registrado con éxito");
        } else{
            logger.info("No se pudo registrar el odontologo");
            respuesta = ResponseEntity.internalServerError().body("No se pudo registrar el odontologo");
        }

        return respuesta;
    }

    @GetMapping("/listarOdontologos")
    public ResponseEntity<List<OdontologoDto>> listarOdontologos(){
        logger.info("Listando odontologos...");
        return ResponseEntity.ok(odontologoService.listarOdontologos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OdontologoDto> buscarOdontologo(@PathVariable Integer id) {
        logger.info("Buscando odontologo id " + id + "...");
        Optional odontologo = odontologoService.buscarOdontologo(id);

        if (odontologo.isPresent()) {
            logger.info("Odontologo encontrado!");
            return ResponseEntity.ok((OdontologoDto) odontologo.get());
        } else {
            logger.info("No se pudo encontrar el odontologo");
            return null;
        }

    }

    @GetMapping("buscarpormatricula/{matricula}")
    public ResponseEntity<Odontologo> buscarOdontologo(@PathVariable String matricula) {
        logger.info("Buscando odontologo matricula " + matricula + "...");

        Odontologo odontologo = odontologoService.buscarOdontologoMatricula(matricula);

        return ResponseEntity.ok(odontologo);
    }

    @PutMapping("/modificar")
    public ResponseEntity<Odontologo> actualizarOdontologo(@RequestBody Odontologo odontologo) {
        ResponseEntity<Odontologo> response = null;

        if (odontologo.getId() != null && odontologoService.buscarOdontologo(odontologo.getId()).isPresent()) {
            logger.info("Odontologo modificado con exito");
            response = ResponseEntity.ok(odontologoService.actualizarOdontologo(odontologo));
        } else {
            logger.info("No se pudo modificar el odontologo");
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarOdontologo(@PathVariable Integer id) {
        ResponseEntity<String> response = null;

        if (odontologoService.buscarOdontologo(id).isPresent()) {
            odontologoService.eliminarOdontologo(id);
            logger.info("Odontologo eliminado");
            response = ResponseEntity.ok("Eliminado");
        } else {
            logger.info("No se pudo eliminar el odontologo");
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }

}
