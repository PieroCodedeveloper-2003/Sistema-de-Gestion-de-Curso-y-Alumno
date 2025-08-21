package com.piero.ecfinal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data // Genera automáticamente getters, setters, toString, equals y hashCode
@AllArgsConstructor // Crea un constructor con todos los atributos
@NoArgsConstructor // Crea un constructor vacío
@Entity // Indica que esta clase será una tabla en la base de datos
@Table(name = "tbl_alumno") // Nombre de la tabla en la base de datos
public class Alumno {

    @Id // Define la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrementa el ID en la BD

    @Column(name = "id_alumno") // Nombre de la columna en la tabla
    private Long idAlumno;
    private String nombre;
    private String apellido;
    //private String dni;
    private String sexo;
    private String distrito;
    @Column(name = "fecha_matricula")
    private LocalDate fechaMatricula;

    // Muchos alumnos pertenecen a un curso
    @ManyToOne
    @JoinColumn(name = "id_curso_fk", // Nombre de la columna FK en la tabla alumno.
                referencedColumnName = "id_curso") // Referencia al campo PK en la tabla curso.
    private Curso curso; // Relación muchos a uno: este alumno está asociado a un curso específico.

}
