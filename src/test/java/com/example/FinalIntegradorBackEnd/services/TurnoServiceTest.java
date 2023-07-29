package com.example.FinalIntegradorBackEnd.services;

import com.example.FinalIntegradorBackEnd.dto.PacienteDto;
import com.example.FinalIntegradorBackEnd.dto.TurnoDto;
import com.example.FinalIntegradorBackEnd.entities.Domicilio;
import com.example.FinalIntegradorBackEnd.entities.Odontologo;
import com.example.FinalIntegradorBackEnd.entities.Paciente;
import com.example.FinalIntegradorBackEnd.entities.Turno;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@RunWith(SpringRunner.class)
@SpringBootTest
public class TurnoServiceTest {

    @Autowired
    private TurnoService turnoService;
    @Autowired
    private PacienteService pacienteService;
    @Autowired
    private OdontologoService odontologoService;


    @Before
    public void agregarTBefore() {

        Paciente paciente = new Paciente();
        paciente.setNombre("Pepe");
        paciente.setApellido("milanesa");
        paciente.setDni("12121212");
        Paciente pc = pacienteService.registrarPaciente(paciente);

        Odontologo odontologo = new Odontologo("Pablo", "milanesa", "45456565");
        Odontologo od = odontologoService.registrarOdontologo(odontologo);

        Turno turno = new Turno(pc, od, new Date(2023,10,21));
        turnoService.registrarTurno(turno);



        Paciente pacienteDos = new Paciente();
        pacienteDos.setNombre("rocio");
        pacienteDos.setApellido("silva");
        pacienteDos.setDni("87878787");
        Paciente pcd = pacienteService.registrarPaciente(pacienteDos);

        Odontologo odontologoDos = new Odontologo("rocio", "silva", "00223344");
        Odontologo odd = odontologoService.registrarOdontologo(odontologoDos);

        Turno turnoDos = new Turno(pcd, odd, new Date(2023,10,22));
        turnoService.registrarTurno(turnoDos);



        Paciente pacienteTres = new Paciente();
        pacienteTres.setNombre("Ana");
        pacienteTres.setApellido("Milanesa");
        pacienteTres.setDni("11111111");
        Paciente pct = pacienteService.registrarPaciente(pacienteTres);

        Odontologo odontologoTres = new Odontologo("pepe", "lujan", "99995555");
        Odontologo odt = odontologoService.registrarOdontologo(odontologoTres);

        Turno turnoTres = new Turno(pct, odt, new Date(2023,10,23));
        turnoService.registrarTurno(turnoTres);
    }

    @Test
    public void registrarTTest() {
        Paciente paciente = new Paciente();
        paciente.setNombre("Marcos");
        paciente.setApellido("Perez");
        paciente.setDni("45454545");
        Paciente pc = pacienteService.registrarPaciente(paciente);

        Odontologo odontologo = new Odontologo("rocio", "silva", "656565");
        Odontologo od = odontologoService.registrarOdontologo(odontologo);

        Turno turno = new Turno(pc, od, new Date(2023,10,20));
        Turno tu = turnoService.registrarTurno(turno);

        Assertions.assertTrue(tu != null);
    }


    @Test
    public void buscarTIdTest () {
        Optional<TurnoDto> t = turnoService.buscarTurno(1);

        Assertions.assertTrue(t.get().getId() == 1);
    }

    @Test
    public void listarTTest () {
        List<TurnoDto> turnos = turnoService.listarTurno();

        Assertions.assertTrue(turnos.size() > 0);
    }

    @Test
    public void eliminarTurnoTest() {
        boolean ret = turnoService.eliminarTurno(1);
        Assertions.assertTrue(ret);
    }

}