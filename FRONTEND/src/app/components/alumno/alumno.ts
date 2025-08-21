import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos FormsModule para usar la vinculación de datos [(ngModel)] en los formularios
import { FormsModule } from '@angular/forms';
// Importamos las interfaces y servicios para manejar datos de alumnos y cursos
import { Alumno as AlumnoModel, AlumnoService } from '../../services/alumno.service';
import { Curso as CursoModel, CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule], // Habilita formularios y directivas comunes en este componente
  templateUrl: './alumno.html',
  styleUrl: './alumno.css'
})

// La clase Alumno implementa OnInit para ejecutar código al iniciar el componente
// Carga listas de alumnos y cursos automáticamente cuando el componente se muestra
export class Alumno implements OnInit {

  alumnos: AlumnoModel[] = [];               // Lista de alumnos visible en la tabla
  cursos: CursoModel[] = [];                 // Lista de cursos para el combobox de selección
  nuevoAlumno: AlumnoModel = {               // Objeto temporal para agregar o editar un alumno
    nombre: '', 
    apellido: '', 
    sexo: '', 
    distrito: '', 
    fechaMatricula: '', 
    //dni: '',
    curso: { 
      idCurso: 0, 
      nombre: '' 
    }
  };

  editando = false;                          // Indica si estamos en modo edición
  idEditando: number | null = null;          // Guarda el ID del alumno que se está editando

  // Inyecta los servicios de alumno y curso para manejar datos y llamadas HTTP
  constructor(
    private alumnoService: AlumnoService,
    private cursoService: CursoService
  ) {}

  // ngOnInit se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.cargarAlumnos(); // Carga lista de alumnos
    this.cargarCursos();  // Carga lista de cursos
  }

  //* Obtiene todos los alumnos usando el servicio
  cargarAlumnos(): void {
    this.alumnoService.getAlumnos().subscribe({
      next: data => this.alumnos = data || [] // Actualiza la lista visible
    });
  }

  //* Obtiene todos los cursos usando el servicio
  cargarCursos(): void {
    this.cursoService.getCursos().subscribe({
      next: data => this.cursos = data || []
    });
  }

  //! Prepara el formulario para editar un alumno existente
  prepararEdicion(a: AlumnoModel): void {
    this.nuevoAlumno = { ...a };              // carga todos los campos para editar
    this.idEditando = a.idAlumno ?? null;
    this.editando = true;
  }

  //! Guarda un alumno (nuevo o editado)
  guardarAlumno(): void {
    // validaciones mínimas !this.nuevoAlumno.dni ||
    if (!this.nuevoAlumno.nombre || !this.nuevoAlumno.apellido || !this.nuevoAlumno.curso?.idCurso) {
      return; // Si faltan campos, no hace nada
    }

    if (this.editando && this.idEditando !== null) {
      // Actualiza un alumno existente
      this.alumnoService.updateAlumno(this.idEditando, this.nuevoAlumno).subscribe({
        next: () => {
          this.cargarAlumnos();   // Refresca la tabla
          this.cargarCursos();    // Refresca lista de cursos si aplica
          this.limpiar();         // Limpia el formulario
        }
      });
    } else {
      // Agrega un nuevo alumno
      this.alumnoService.addAlumno(this.nuevoAlumno).subscribe({
        next: () => {
          this.cargarAlumnos();
          this.cargarCursos();
          this.limpiar();
        }
      });
    }
  }

  //! Elimina un alumno por ID
  eliminarAlumno(id: number): void {
    this.alumnoService.deleteAlumno(id).subscribe({
      next: () => {
        this.cargarAlumnos();   // Refresca la lista
        this.cargarCursos();    // Refresca lista de cursos si aplica
      }
    });
  }

  //* Cancela la edición y limpia el formulario
  cancelar(): void {
    this.limpiar();
  }

  //* Limpia el formulario y resetea variables de edición *
  limpiar(): void {
    this.nuevoAlumno = { 
      nombre: '', 
      apellido: '', 
      sexo: '', 
      distrito: '', 
      fechaMatricula: '', 
      //dni: '',
      curso: { 
        idCurso: 0, 
        nombre: '' 
      } 
    };
    this.editando = false;
    this.idEditando = null;
  }

}
