-- Crear la base de datos
CREATE DATABASE bd_ecfinal;
USE bd_ecfinal;

-- Consulta todo de la tabla alumno y curso
SELECT * FROM bd_ecfinal.tbl_alumno;
SELECT * FROM bd_ecfinal.tbl_curso;

-- Estructura de la tabla alumno y la tabla curso
DESCRIBE tbl_alumno;
DESCRIBE tbl_curso;

-- Cambiamos el delimitador a // porque dentro del trigger usamos ';' para separar sentencias.
-- El '//' indica el fin completo del trigger, mientras que ';' separa las instrucciones internas.
DELIMITER //

-- 1) Trigger que se ejecuta después de insertar un nuevo alumno
CREATE TRIGGER trg_alumno_insert
AFTER INSERT ON tbl_alumno
FOR EACH ROW
BEGIN
    -- Actualiza la tabla CURSO
    UPDATE tbl_curso
    -- Incrementa en 1 la 'cantidad de alumnos' del curso al que se asigna el nuevo alumno
    SET cantidad_alumnos = cantidad_alumnos + 1
    -- Solo se actualiza el curso cuyo id coincide con el id_curso_fk del nuevo alumno
    -- NEW hace referencia a los valores del nuevo registro insertado en tbl_alumno
    WHERE id_curso = NEW.id_curso_fk;
END;
//

-- 2) Trigger que se ejecuta después de eliminar un alumno
CREATE TRIGGER trg_alumno_delete
AFTER DELETE ON tbl_alumno
FOR EACH ROW
BEGIN
    -- Actualiza la tabla CURSO
    UPDATE tbl_curso
    -- Decrementa en 1 la 'cantidad de alumnos' del curso al que pertenecía el alumno eliminado
    SET cantidad_alumnos = cantidad_alumnos - 1
    -- Solo se actualiza el curso cuyo id coincide con el id_curso_fk del alumno eliminado
    -- OLD hace referencia a los valores del registro antes de eliminar
    WHERE id_curso = OLD.id_curso_fk;
END;
//

-- 3) Trigger que se ejecuta después de actualizar un alumno
CREATE TRIGGER trg_alumno_update
AFTER UPDATE ON tbl_alumno
FOR EACH ROW
BEGIN
    -- Verifica si el curso del alumno cambió
    IF OLD.id_curso_fk <> NEW.id_curso_fk THEN
        -- Actualiza la tabla CURSO
        UPDATE tbl_curso
        -- Resta 1 a la cantidad de alumnos del curso anterior
        SET cantidad_alumnos = cantidad_alumnos - 1
        -- Solo se actualiza el curso cuyo id coincide con el id_curso_fk anterior del alumno
        -- OLD hace referencia a los valores del registro antes de actualizar
        WHERE id_curso = OLD.id_curso_fk;

        -- Actualiza la tabla CURSO
        UPDATE tbl_curso
        -- Suma 1 a la cantidad de alumnos del nuevo curso
        SET cantidad_alumnos = cantidad_alumnos + 1
        -- Solo se actualiza el curso cuyo id coincide con el id_curso_fk nuevo del alumno
        -- NEW hace referencia a los valores del nuevo registro insertado en tbl_alumno
        WHERE id_curso = NEW.id_curso_fk;
    END IF;
END;
//

-- Usamos DELIMITER; para volver al delimitador normal de MySQL
DELIMITER ;

-- Muestra todos los triggers hechos
SHOW TRIGGERS FROM bd_ecfinal;
