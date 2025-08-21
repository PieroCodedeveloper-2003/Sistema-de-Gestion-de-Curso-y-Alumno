import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',  // Selector usado en index.html para mostrar este componente.
  standalone: true,      // Se usa para que Angular ejecute la aplicación.
  imports: [
    RouterOutlet,        // Muestra las vistas según la ruta (app.routes.ts)
    RouterModule         // Hace que Angular entienda las rutas y las conecte con RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('ecfinal_angular');
}
