import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// Provee HttpClient en todos los services para hacer peticiones HTTP al backend.
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),      // Captura errores globales del navegador
    provideZonelessChangeDetection(),          // Detección de cambios más eficiente (sin Zone.js)
    provideRouter(routes),                     // Activa las rutas definidas en app.routes.ts
    provideHttpClient(),                       // ⬅ Provee HttpClient para que los services hagan peticiones HTTP
    provideClientHydration(withEventReplay())  // Soporte de hidratación (mejora SSR / eventos iniciales)
  ]
};
