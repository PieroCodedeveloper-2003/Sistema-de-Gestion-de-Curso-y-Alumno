import { Routes } from '@angular/router';
// Importamos los componentes de Alumno y Curso.
import { Curso } from './components/curso/curso';
import { Alumno } from './components/alumno/alumno';

// Definimos el arreglo de rutas de la aplicación.
export const routes: Routes = [

    // path: Cuando el usuario vaya a /cursos en la URL.
    // component: Se mostrará el componente Curso dentro de <router-outlet>
    { path: 'cursos', component: Curso },

    // path: Cuando el usuario vaya a /alumnos en la URL.
    // component: Se mostrará el componente Alumno dentro de <router-outlet>
    { path: 'alumnos', component: Alumno },

    // path: Cuando el usuario no escriba nada en la URL (ej: http://localhost:4200/)
    // component: Lo redirige automáticamente a la ruta /cursos.
    // pathMatch: Asegura que solo redirija si el path está completamente vacío.
    { path: '', redirectTo: 'cursos', pathMatch: 'full' }
    
];
