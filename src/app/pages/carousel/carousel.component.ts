import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  @Input() items: { src: string; alt: string }[] = [];
  /*
  @ViewChild('slider', { static: false })
  slider!: ElementRef<HTMLDivElement>;

  scrollLeft() {
    this.slider.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }
  scrollRight() {
    this.slider.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

  currentIndex = 0;
  intervalId: any;
  ngOnInit(): void {
    // Cambia de slide cada 3 segundos
    this.intervalId = setInterval(() => {
      this.next();
    }, 2000);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
    */
}
