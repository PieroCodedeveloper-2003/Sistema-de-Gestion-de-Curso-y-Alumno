package com.piero.ecfinal.repository;

import com.piero.ecfinal.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Indica que esta interfaz es un repositorio Spring Data JPA para acceso a datos.
public interface CursoRepository extends JpaRepository<Curso, Long> {}
