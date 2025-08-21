package com.piero.ecfinal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data // Genera automáticamente getters, setters, toString, equals y hashCode
@AllArgsConstructor // Crea un constructor con todos los atributos
@NoArgsConstructor // Crea un constructor vacío
@Entity // Indica que esta clase será una tabla en la base de datos
@Table(name = "tbl_curso") // Nombre de la tabla en la base de datos
public class Curso {

    @Id // Define la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrementa el ID en la BD

    @Column(name = "id_curso") // Nombre de la columna en la tabla
    private Long idCurso;
    private String nombre;
    @Column(name = "cantidad_alumnos")
    private Integer cantidadAlumnos = 0; // Por defecto inicia en 0

    // Un curso puede tener muchos alumnos
    @OneToMany(mappedBy = "curso", // Mapeada desde el atributo 'curso' en Alumno.
               cascade = CascadeType.ALL, // Las operaciones en Curso se aplican también a los alumnos (crear, actualizar, eliminar)
               orphanRemoval = true) // Si se elimina un alumno de la lista, se borra en la BD.
    @JsonIgnore // Evita ciclos infinitos al convertir a JSON.
    private List<Alumno> alumnos;

}
