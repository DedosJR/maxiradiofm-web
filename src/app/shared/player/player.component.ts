import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AzuraCastService } from '../../core/services/azuracast.service';
import { interval } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  songTitle = 'Cargando...';
  songArtist = 'Música en vivo';
  songArt = 'assets/album_art.png'; // Ruta a una imagen por defecto
  streamUrl = 'https://server1.maxiradiofm.com/radio/8000/radio.mp3';
  isPlaying = false;
  volume = 0.7;

  constructor(private azuraService: AzuraCastService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Solo ejecutar código específico del navegador si estamos en un entorno de navegador
    if (isPlatformBrowser(this.platformId)) {
      // Configurar volumen inicial
      setTimeout(() => {
        if (this.audioPlayer?.nativeElement) {
          this.audioPlayer.nativeElement.volume = this.volume;
        }
      }, 500);

      // Obtener información de la canción
      interval(5000)
        .pipe(
          switchMap(() => this.azuraService.getNowPlaying()),
          catchError((error) => {
            console.error('Error fetching song data:', error);
            return []; // Retorna un observable vacío para continuar
          })
        )
        .subscribe((data: any) => {
          if (data?.now_playing?.song) {
            this.updateSongInfo(data.now_playing);
          }
        });
    }
  }

  updateSongInfo(nowPlaying: any): void {
    this.songTitle = nowPlaying.song.title || 'Maxi Radio FM';
    this.songArtist = nowPlaying.song.artist || 'Marcando la diferencia';

    // Manejar la imagen de portada
    if (nowPlaying.song.art) {
      this.songArt = nowPlaying.song.art;
    } else {
      // Intenta obtener la imagen del álbum de otra propiedad si está disponible
      this.songArt = nowPlaying.song.album?.art || 'assets/album_art.png';
    }
  }

  togglePlay(): void {
    // Solo ejecutar código específico del navegador si estamos en un entorno de navegador
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (!this.audioPlayer?.nativeElement) return;

    const audio = this.audioPlayer.nativeElement;

    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.load(); // fuerza recarga del stream
      setTimeout(() => {
        audio.play().catch((e) => {
          console.error('Error al reproducir:', e);
          this.isPlaying = false;
        });
      }, 800); // Espera para que haya algo en el buffer
    }

    this.isPlaying = !this.isPlaying;
  }

  setVolume(event: Event): void {
    // Solo ejecutar código específico del navegador si estamos en un entorno de navegador
    if (!isPlatformBrowser(this.platformId)) return;
    
    const target = event.target as HTMLInputElement;
    this.volume = parseFloat(target.value);
    if (this.audioPlayer?.nativeElement) {
      this.audioPlayer.nativeElement.volume = this.volume;
    }
  }
}
