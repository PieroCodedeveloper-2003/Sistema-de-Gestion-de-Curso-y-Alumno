import { Component, OnInit } from '@angular/core';
// Importamos FormsModule para usar la vinculación de datos [(ngModel)] en los formularios
import { FormsModule } from '@angular/forms';
// Importamos la interfaz Curso y el servicio CursoService para manejar datos y peticiones HTTP
import { Curso as CursoModel, CursoService } from '../../services/curso.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [FormsModule, CommonModule], // Habilita formularios y directivas comunes en este componente
  templateUrl: './curso.html',
  styleUrl: './curso.css'
})

// La clase Curso implementa OnInit para ejecutar código al iniciar el componente.
// En este caso, ngOnInit() carga automáticamente los cursos desde el backend cuando el componente se muestra.
export class Curso implements OnInit {

  cursos: CursoModel[] = [];                        // Cursos que se muestran en la tabla del componente (HTML) para el usuario.
  cursosOriginal: CursoModel[] = [];                // Lista completa de cursos sin aplicar filtros.
  nuevoCurso: Partial<CursoModel> = { nombre: '' }; // Objeto temporal usado para crear un nuevo curso o editar uno existente.
  editando: boolean = false;                        // Indica si actualmente estamos editando un curso.
  idEditando: number | null = null;                 // Guarda el ID del curso que estamos editando; null si no se está editando.

  // Inyecta CursoService para manejar llamadas HTTP y datos de cursos,
  // y ChangeDetectorRef para actualizar la vista cuando los datos cambian.
  constructor(private cursoService: CursoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarCursos(); // Carga los cursos cuando el componente inicia
  }

  //* Obtiene todos los cursos usando el servicio y actualiza las listas del componente
  cargarCursos(): void {
    this.cursoService.getCursos().subscribe({
      next: (data) => {
        this.cursosOriginal = data;  // Guarda la lista completa sin filtros
        this.cursos = [...data];     // Lista que se mostrará en la interfaz (HTML)
      }
    });
  }

  //! Maneja el formulario para agregar un nuevo curso o actualizar uno existente
  agregarCurso(): void {
    if (!this.nuevoCurso.nombre || this.nuevoCurso.nombre.trim() === '') {
      // Si el nombre está vacío, limpia el formulario y no hace nada
      this.limpiarFormulario();
      return;
    }

    if (this.editando && this.idEditando !== null) {
      // Si estamos editando, actualizamos el curso usando el servicio 
      this.cursoService.updateCurso(this.idEditando, this.nuevoCurso).subscribe({
        next: (cursoActualizado) => {
          // Reemplazamos el curso actualizado en la lista que se muestra en la interfaz
          const index = this.cursos.findIndex(c => c.idCurso === this.idEditando);
          if (index !== -1) this.cursos[index] = cursoActualizado;
          this.limpiarFormulario(); // Limpiamos el formulario después de actualizar
        }
      });
    } else {
      // Si no estamos editando, agregamos un nuevo curso usando el servicio
      this.cursoService.addCurso(this.nuevoCurso).subscribe({
        next: (cursoCreado) => {
          this.cursos.push(cursoCreado); // Añadimos el nuevo curso a la lista que se muestra
          this.limpiarFormulario(); // Limpiamos el formulario después de agregar
        }
      });
    }
  }

  //! Prepara el formulario para editar un curso existente
  editarCurso(curso: CursoModel): void {
    this.nuevoCurso = { nombre: curso.nombre }; // Copia el nombre del curso seleccionado al formulario
    this.idEditando = curso.idCurso ?? null;    // Guarda el ID del curso que vamos a actualizar
    this.editando = true;                       // Cambia el estado del formulario a modo edición
  }

  //! Elimina un curso de la lista usando su ID
  eliminarCurso(id: number): void {
    // Llama al servicio para eliminar el curso en el backend
    this.cursoService.deleteCurso(id).subscribe({
      next: () => {
        // Recarga la lista de cursos actualizada después de eliminar
        this.cargarCursos();
        // Si estábamos editando el curso eliminado, limpiamos el formulario
        if (this.editando && this.idEditando === id) this.limpiarFormulario();
      }
    });
  }

  //* Limpia el formulario y resetea las variables de edición
  limpiarFormulario(): void {
    this.nuevoCurso = { nombre: '' }; // Limpia el formulario
    this.editando = false;            // Cambia el estado a no editar
    this.idEditando = null;           // Limpia el ID guardado
  }

}
