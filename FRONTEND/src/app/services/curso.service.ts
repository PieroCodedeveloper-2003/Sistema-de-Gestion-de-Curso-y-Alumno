import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//! El service se encarga de la comunicación entre los componentes y el backend.
//! Permite enviar y recibir datos mediante peticiones HTTP (GET, POST, PUT, DELETE),
//! facilitando que los componentes consuman la información sin preocuparse de los detalles del backend.

// Definimos la interfaz Curso con los campos que maneja el backend.
// Le indica a Angular qué propiedades puede enviar y recibir en las peticiones.
export interface Curso {
  idCurso?: number;          // Lo genera el backend automáticamente, no lo enviamos al crear.
  nombre: string;            // Se escribe al registrar el curso.
  cantidadAlumnos?: number;  // Lo actualiza un TRIGGER en la BD MySQL y lo recibimos ya calculado.
}

@Injectable({
  // Hace que este servicio esté disponible en toda la app, sin necesidad de importarlo en cada módulo.
  providedIn: 'root'
})

export class CursoService {

  // Esta es la URL del backend.
  private apiUrl = 'http://localhost:8091/cursos';

  // Inyecta HttpClient para hacer solicitudes HTTP al backend.
  constructor(private http: HttpClient) {}


  // Obtener todos los cursos
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  // Crear un nuevo curso
  addCurso(curso: Partial<Curso>): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  // Actualizar un curso existente
  updateCurso(id: number, curso: Partial<Curso>): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso);
  }

  // Eliminar un curso
  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
