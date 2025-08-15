import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  currentYear: number;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Usar new Date() es seguro tanto en el servidor como en el navegador
    // pero lo incluimos en la verificación por consistencia
    if (isPlatformBrowser(this.platformId)) {
      this.currentYear = new Date().getFullYear();
    } else {
      // En el servidor, podemos usar new Date() o simplemente establecer un valor predeterminado
      this.currentYear = new Date().getFullYear();
    }
  }
  // Add any additional properties or methods you need for the footer component
}
