package com.piero.ecfinal.service;

import com.piero.ecfinal.model.Alumno;
import com.piero.ecfinal.model.Curso;
import com.piero.ecfinal.repository.AlumnoRepository;
import com.piero.ecfinal.repository.CursoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service // Marca la clase como un servicio de Spring para lógica de negocio.
public class AlumnoService {

    private final AlumnoRepository alumnoRepository;
    private final CursoRepository cursoRepository;

    // Constructor para inyectar el repositorio de alumno y curso
    public AlumnoService(AlumnoRepository alumnoRepository,
                         CursoRepository cursoRepository) {
        this.alumnoRepository = alumnoRepository;
        this.cursoRepository = cursoRepository;
    }

    /* Listar todos los Alumnos */
    public List<Alumno> getAllAlumnos() {
        return alumnoRepository.findAll();
    }

    /* Buscar un Alumno por Id, o devuelve un null */
    public Alumno getAlumnoById(Long id) {
        return alumnoRepository.findById(id).orElse(null);
    }

    /* Crear un Alumno */
    public Alumno saveAlumno(Alumno alumno) {
        // Obtener el ID del curso enviado en el request dentro del objeto Alumno
        // - alumno tiene un atributo curso (tipo Curso)
        // - getCurso() devuelve ese objeto Curso
        // - getIdCurso() devuelve solo el ID del curso (Long)
        Long idCurso = alumno.getCurso().getIdCurso();
        // Buscar el curso en la BD por ID
        Curso curso = cursoRepository.findById(idCurso).orElse(null);
        // Si existe el curso, lo asignamos al alumno, si no, devolvemos null
        if (curso != null) {
            alumno.setCurso(curso);
        } else {
            return null;
        }
        // Guardar el alumno en la BD y retornarlo
        return alumnoRepository.save(alumno);
    }

    /* Actualizar un Alumno */
    public Alumno updateAlumno(Long id, Alumno nuevoAlumno) {
        // Obtiene el Alumno completo por ID para poder actualizar sus datos
        Alumno alumnoExistente = getAlumnoById(id);
        // Obtiene el ID del curso del nuevo Alumno
        Long idCurso = nuevoAlumno.getCurso().getIdCurso();
        // Buscar el curso en la BD por ID
        Curso curso = cursoRepository.findById(idCurso).orElse(null);
        // Si el Alumno existe, actualizar sus atributos con los datos del nuevo Alumno
        if (alumnoExistente != null) {
            alumnoExistente.setNombre(nuevoAlumno.getNombre());
            alumnoExistente.setApellido(nuevoAlumno.getApellido());
            alumnoExistente.setSexo(nuevoAlumno.getSexo());
            alumnoExistente.setDistrito(nuevoAlumno.getDistrito());
            alumnoExistente.setFechaMatricula(nuevoAlumno.getFechaMatricula());
            alumnoExistente.setCurso(curso);
            // El trigger actualizará cantidadAlumnos si cambió el curso
            return alumnoRepository.save(alumnoExistente);
        } else {
            // Si no existe, devolver null
            return null;
        }
    }

    /* Eliminar un Alumno */
    public void deleteAlumno(Long id) {
        alumnoRepository.deleteById(id);
    }

}
