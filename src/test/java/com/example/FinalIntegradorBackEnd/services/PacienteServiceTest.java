package com.example.FinalIntegradorBackEnd.services;

import com.example.FinalIntegradorBackEnd.dto.PacienteDto;
import com.example.FinalIntegradorBackEnd.entities.Domicilio;
import com.example.FinalIntegradorBackEnd.entities.Odontologo;
import com.example.FinalIntegradorBackEnd.entities.Paciente;

import org.junit.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.runner.RunWith;
import org.junit.FixMethodOrder;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@RunWith(SpringRunner.class)
@SpringBootTest
public class PacienteServiceTest {

    @Autowired
    private PacienteService pacienteService;

    @Before
    public void registrarTBefore() {



        Domicilio domicilioUno = new Domicilio("Calle siempre viva", 123, "Una");
        Paciente paciente = new Paciente();
        paciente.setNombre("rocio");
        paciente.setApellido("silva");
        paciente.setDomicilio(domicilioUno);
        paciente.setDni("12345678");
        paciente.setFechaAlta(new Date(2023,6,30));
        pacienteService.registrarPaciente(paciente);

        Domicilio domicilioDos = new Domicilio("Av false", 456, "Otra");
        Paciente pacienteDos = new Paciente();
        pacienteDos.setNombre("Rocio");
        pacienteDos.setApellido("Silva");
        pacienteDos.setDomicilio(domicilioDos);
        pacienteDos.setDni("87654321");
        pacienteDos.setFechaAlta(new Date(2023,6,30));
        pacienteService.registrarPaciente(pacienteDos);

    }

    @Test
    public void registrarPTest() {
        Domicilio domicilio = new Domicilio("Av false", 456, "otra");
        Paciente paciente = new Paciente();
        paciente.setNombre("rocio");
        paciente.setApellido("silva");
        Paciente pc = pacienteService.registrarPaciente(paciente);

        Assertions.assertTrue((pc != null));
        Assertions.assertTrue(pc.getId() != null);
    }

    @Test
    public void buscarPIdTest () {
        Optional<PacienteDto> p = pacienteService.buscarPaciente(1);

        Assertions.assertTrue(p.get().getId() == 1);
    }

    @Test
    public void listarPTest () {
        List<PacienteDto> pacientes = pacienteService.listarPacientes();

        Assertions.assertTrue(pacientes.size() > 0);
    }



    @Test
    public void eliminarPacienteTest() {
        boolean ret = pacienteService.eliminarPaciente(2);
        Assertions.assertTrue(ret);
    }


}