package com.piero.ecfinal.controller;

import com.piero.ecfinal.model.Alumno;
import com.piero.ecfinal.service.AlumnoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // Permite solicitudes desde el frontend Angular
@RestController // Marca la clase como un controlador REST
public class AlumnoController {

    private final AlumnoService alumnoService;

    // Constructor con inyección del servicio
    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    // Obtiene todos los alumnos registrados.
    // http://localhost:8090/alumnos
    @GetMapping("/alumnos")
    public List<Alumno> listarAlumnos() {
        return alumnoService.getAllAlumnos();
    }

    // Crear un nuevo alumno
    // http://localhost:8090/alumnos
    // {
    //    "nombre": "Juan",
    //    "apellido": "Pérez",
    //    "sexo": "M",
    //    "distrito": "Miraflores",
    //    "fechaMatricula": "2025-08-10",
    //    "curso": {
    //      "idCurso": 1
    //    }
    // }
    @PostMapping("/alumnos")
    public Alumno crearAlumno(@RequestBody Alumno alumno) {
        return alumnoService.saveAlumno(alumno);
    }

    // Actualizar un alumno por ID
    // http://localhost:8090/alumnos/1
    // {
    //    "nombre": "Juan Carlos",
    //    "apellido": "Pérez",
    //    "sexo": "M",
    //    "distrito": "San Isidro",
    //    "fechaMatricula": "2025-08-15",
    //    "curso": {
    //      "idCurso": 2
    //    }
    // }
    @PutMapping("/alumnos/{id}")
    public ResponseEntity<?> actualizarAlumno(@PathVariable Long id, @RequestBody Alumno alumno) {
        // @PathVariable: Obtiene el ID desde la url.
        // @RequestBody: Recibe el curso enviado en el cuerpo de la petición.
        // ResponseEntity<?>: Sirve para devolver una respuesta completa al cliente.
        // Incluye el estado HTTP (200, 404, etc.) y también el contenido (mensaje o curso).

        // Llama al servicio para actualizar al alumno con el ID y los nuevos datos
        Alumno alumnoActualizado = alumnoService.updateAlumno(id, alumno);
        if (alumnoActualizado == null) {
            // Si no encuentra el ID del alumno, devuelve un error 404 (no encontrado)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se puede actualizar. Alumno no encontrado con id: " + id);
        }
        // Si lo encuentra lo actualiza, devuelve el alumno actualizado con estado 200 (OK)
        return ResponseEntity.ok(alumnoActualizado);
    }

    // Eliminar un alumno por ID
    // http://localhost:8090/alumnos/1
    @DeleteMapping("/alumnos/{id}")
    public ResponseEntity<String> eliminarAlumno(@PathVariable Long id) {
        // @PathVariable: Obtiene el ID desde la url.
        // ResponseEntity<String>: Sirve para devolver una respuesta completa al cliente.
        // Incluye el estado HTTP (200, 404, etc.) y también el contenido (mensaje).

        // Llama al servicio para buscar el ID del alumno
        Alumno alumno = alumnoService.getAlumnoById(id);
        if (alumno == null) {
            // Si no encuentra el ID del alumno, devuelve un error 404 (no encontrado)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se puede eliminar. Alumno no encontrado con id: " + id);
        }
        // Si lo encuentra lo elimina, devuelve un mensaje con estado 200 (OK)
        alumnoService.deleteAlumno(id);
        return ResponseEntity.ok("Alumno con id " + id + " ha sido eliminado");
    }

}
