package com.piero.ecfinal.controller;

import com.piero.ecfinal.model.Curso;
import com.piero.ecfinal.service.CursoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // Permite solicitudes desde el frontend Angular
@RestController // Marca la clase como un controlador REST
public class CursoController {

    private final CursoService cursoService;

    // Constructor con inyección del servicio
    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    // Obtiene todos los cursos registrados.
    // http://localhost:8090/cursos
    @GetMapping("/cursos")
    public List<Curso> listarCursos() {
        return cursoService.getAllCursos();
    }

    // Crear un nuevo curso
    // http://localhost:8090/cursos
    // {"nombre": "Matemáticas"}
    @PostMapping("/cursos")
    public Curso crearCurso(@RequestBody Curso curso) {
        return cursoService.saveCurso(curso);
    }

    // Actualizar un curso por ID
    // http://localhost:8090/cursos/1
    // {"nombre": "Matemáticas Avanzadas"}
    @PutMapping("/cursos/{id}")
    public ResponseEntity<?> actualizarCurso(@PathVariable Long id, @RequestBody Curso curso) {
        // @PathVariable: Obtiene el ID desde la url.
        // @RequestBody: Recibe el curso enviado en el cuerpo de la petición.
        // ResponseEntity<?>: Sirve para devolver una respuesta completa al cliente.
        // Incluye el estado HTTP (200, 404, etc.) y también el contenido (mensaje o curso).

        // Llama al servicio para actualizar el curso con el ID y los nuevos datos
        Curso cursoActualizado = cursoService.updateCurso(id, curso);
        if (cursoActualizado == null) {
            // Si no encuentra el ID del curso, devuelve un error 404 (no encontrado)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se puede actualizar. Curso no encontrado con id: " + id);
        }
        // Si lo encuentra lo actualiza, devuelve el curso actualizado con estado 200 (OK)
        return ResponseEntity.ok(cursoActualizado);
    }

    // Eliminar un curso por ID
    // http://localhost:8090/cursos/1
    @DeleteMapping("/cursos/{id}")
    public ResponseEntity<String> eliminarCurso(@PathVariable Long id) {
        // @PathVariable: Obtiene el ID desde la url.
        // ResponseEntity<String>: Sirve para devolver una respuesta completa al cliente.
        // Incluye el estado HTTP (200, 404, etc.) y también el contenido (mensaje).

        // Llama al servicio para buscar el ID del curso
        Curso curso = cursoService.getCursoById(id);
        if (curso == null) {
            // Si no encuentra el ID del curso, devuelve un error 404 (no encontrado)
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se puede eliminar. Curso no encontrado con id: " + id);
        }
        // Si lo encuentra lo elimina, devuelve un mensaje con estado 200 (OK)
        cursoService.deleteCurso(id);
        return ResponseEntity.ok("Curso con id " + id + " ha sido eliminado");
    }

}
