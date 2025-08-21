import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


//! Explicación importante:
//todo: Tenemos dos interfaces de Curso:
//?1. En CursoService: Curso tiene idCurso, nombre y cantidadAlumnos porque manejamos directamente los cursos.
//?2. En AlumnoService: Curso solo tiene idCurso y nombre porque cuando registramos un alumno, solo necesitamos saber a qué curso pertenece.
//?La interfaz Alumno sí tiene todos los atributos del alumno.
//?Los métodos HTTP usan el objeto completo (Alumno o Curso) y la interfaz solo indica a Angular qué estructura esperar.


// Definimos la interfaz Curso usada dentro de Alumno.
// Le indica a Angular qué propiedades puede enviar y recibir en las peticiones.
export interface Curso {
  idCurso: number;           // ID del curso al que pertenece el alumno. Lo define el backend.
  nombre: string;            // Nombre del curso. Este dato lo asignamos al registrar el alumno.
}

// Definimos la interfaz Alumno con los campos que maneja el backend
// Le indica a Angular qué propiedades puede enviar y recibir en las peticiones.
export interface Alumno {
  idAlumno?: number;         // ID generado por el backend; no se envía al crear un alumno nuevo
  nombre: string;            // Nombre del alumno (obligatorio)
  apellido: string;          // Apellido del alumno (obligatorio)
  sexo: string;              // Sexo del alumno (obligatorio)
  distrito: string;          // Distrito del alumno (obligatorio)
  fechaMatricula: string;    // Fecha de matrícula en formato 'YYYY-MM-DD'
  curso: Curso;              // Curso al que pertenece el alumno (obligatorio)
}

@Injectable({
  // Hace que este servicio esté disponible en toda la app, sin necesidad de importarlo en cada módulo.
  providedIn: 'root'
})

export class AlumnoService {

  // Esta es la URL del backend.
  private apiUrl = 'http://localhost:8091/alumnos';

  // Inyecta HttpClient para hacer solicitudes HTTP al backend.
  constructor(private http: HttpClient) {}
  

  // Obtener todos los alumnos
  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  // Crear un alumno nuevo
  addAlumno(alumno: Partial<Alumno>): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, alumno);
  }

  // Actualizar un alumno existente
  updateAlumno(id: number, alumno: Partial<Alumno>): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, alumno);
  }

  // Eliminar un alumno por ID
  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
