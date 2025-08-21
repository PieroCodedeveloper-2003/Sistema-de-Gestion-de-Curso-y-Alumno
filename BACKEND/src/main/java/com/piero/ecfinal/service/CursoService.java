package com.piero.ecfinal.service;

import com.piero.ecfinal.model.Curso;
import com.piero.ecfinal.repository.CursoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service // Marca la clase como un servicio de Spring para lógica de negocio.
public class CursoService {

    private final CursoRepository cursoRepository;

    // Constructor para inyectar el repositorio de curso
    public CursoService(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    /* Listar todos los Cursos */
    public List<Curso> getAllCursos() {
        return cursoRepository.findAll();
    }

    /* Buscar un Curso por Id, o devuelve un null */
    public Curso getCursoById(Long id) {
        return cursoRepository.findById(id).orElse(null);
    }

    /* Crear un Curso */
    public Curso saveCurso(Curso curso) {
        return cursoRepository.save(curso);
    }

    /* Actualizar un Curso */
    public Curso updateCurso(Long id, Curso nuevoCurso) {
        // Reusa el método getCursoById para verificar si existe el ID en la BD
        // getCursoById(id) devuelve el objeto Curso completo, no solo el ID,
        // por eso podemos usarlo después en la condicional y modificar sus atributos
        Curso cursoExistente = getCursoById(id);
        if (cursoExistente != null) {
            cursoExistente.setNombre(nuevoCurso.getNombre()); // Actualiza el nombre
            // No modificaré la cantidadAlumnos aquí, lo hace el trigger
            return cursoRepository.save(cursoExistente);
        } else {
            // Si no existe, no se actualiza nada
            return null;
        }
    }

    /* Eliminar un Curso */
    public void deleteCurso(Long id) {
        cursoRepository.deleteById(id);
    }

}
