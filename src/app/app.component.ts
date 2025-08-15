import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PlayerComponent } from './shared/player/player.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PlayerComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MaxiRadioFM';
  // Variable para controlar la visibilidad del player
  playerVisible: boolean = false;
  // Variable para controlar la visibilidad del botón de scroll
  showScrollButton = false;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    // Solo ejecutar código específico del navegador si estamos en un entorno de navegador
    if (isPlatformBrowser(this.platformId)) {
      // Suscribirse a los eventos de navegación
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          // Scroll al inicio cuando se navega a una nueva página
          window.scrollTo(0, 0);
        });

      // Detectar el scroll para mostrar/ocultar el botón
      window.addEventListener('scroll', () => {
        this.showScrollButton = window.scrollY > 300;
      });
    }
  }

  togglePlayer() {
    this.playerVisible = !this.playerVisible;
  }

  // Método para scroll hacia arriba
  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
