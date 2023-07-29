package com.example.FinalIntegradorBackEnd.repository;

import com.example.FinalIntegradorBackEnd.entities.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Integer> {

    @Query("select p from Paciente p where p.dni = ?1")
    Paciente findPacienteByDni(String dni);

}
