import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { WordpressService } from '../../core/services/wordpress.service';
import { Post, Tag, Category } from '../../core/models/post.model';
import { filter } from 'rxjs/operators';
import { CarouselComponent } from '../../pages/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselComponent],
  providers: [WordpressService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  post: Post[] = [];
  deportes: Post[] = [];
  tendencia: Post[] = [];
  postTags: { [postId: number]: Tag[] } = {};
  postCategories: { [postId: number]: Category[] } = {};
  showScrollButton = false;
  banners = [
    { img: 'Feria-Tijuana/Palenque/Carin-Leon-Ago-28.jpg' },
    { img: 'Feria-Tijuana/Palenque/Carin-Leon-Ago-29.jpg' },
    { img: 'Feria-Tijuana/Palenque/Edicion-Especial-Ago-30.jpg' },
    { img: 'Feria-Tijuana/Palenque/Del-Rancho-Al-Palenque-Ago-31.jpg' },
    { img: 'Feria-Tijuana/Palenque/Julion-Alvarez-Sep-04.jpg' },
    { img: 'Feria-Tijuana/Palenque/Julion-Alvarez-Sep-05.jpg' },
    { img: 'Feria-Tijuana/Palenque/Cooyote,-Julio-Preciado-Sep-06.jpg' },
    { img: 'Feria-Tijuana/Palenque/Jorge-Medina,-Josi-Cuen-Sep-10.jpg' },
    { img: 'Feria-Tijuana/Palenque/Jorge-Medina,-Josi-Cuen-Sep-11.jpg' },
    { img: 'Feria-Tijuana/Palenque/El-komander,-Hijos-de-Barron-Sep-13.jpg' },
    { img: 'Feria-Tijuana/Palenque/Matute-Sep-14.jpg' },
    { img: 'Feria-Tijuana/Palenque/Alfredo-Olivas-Sep-19.jpg' },
    { img: 'Feria-Tijuana/Palenque/La-Parranda-Sep-20.jpg' },
    { img: 'Feria-Tijuana/Palenque/Lorenzo-Monteclaro,-Lalo-Mora-Sep-21.jpg' },
    { img: 'Feria-Tijuana/Palenque/Sep-25.jpg' },
    { img: 'Feria-Tijuana/Palenque/Sep-26.jpg' },
    { img: 'Feria-Tijuana/Palenque/Banda-MS-Sep-27.jpg' },
  ];
  // Array for the slider
  bannersTeatro = [
    { img: 'Feria-Tijuana/Teatro/Agosto29.jpg' },
    { img: 'Feria-Tijuana/Teatro/Agosto30.jpg' },
    { img: 'Feria-Tijuana/Teatro/Agosto31.jpg' },
    { img: 'Feria-Tijuana/Teatro/Septiembre04.jpg' },
    { img: 'Feria-Tijuana/Teatro/Septiembre05.jpg' },
    { img: 'Feria-Tijuana/Teatro/Septiembre06.jpg' },
    { img: 'Feria-Tijuana/Teatro/Septiembre07.jpg' },
    { img: 'Feria-Tijuana/Teatro/Septiembre12.jpg' },
    { img: 'Feria-Tijuana/Teatro/Septiembre13.jpg' },
    { img: 'Feria-Tijuana/Teatro/Septiembre14.jpg' },
    { img: 'Feria-Tijuana/Teatro/Septiembre18.jpg' },
    { img: 'Feria-Tijuana/Teatro/Septiembre19.jpg' },
    { img: 'Feria-Tijuana/Teatro/Septiembre20.jpg' },
    { img: 'Feria-Tijuana/Teatro/Septiembre21.jpg' },
    { img: 'Feria-Tijuana/Teatro/Septiembre27.jpg' },
    { img: 'Feria-Tijuana/Teatro/Septiembre28.jpg' },
  ];
  activeIndex = 0;
  // End Array for the slider
  constructor(
    private wpService: WordpressService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    //Banner carousel functionality
    setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.banners.length;
    }, 5000);

    // Fetch all posts and posts by category on component initialization
    this.wpService.getPosts(7).subscribe((posts) => {
      this.posts = posts;
      console.log('Baja Posts:', this.posts);
      this.loadPostMetadata(this.posts);
    });
    // Fetch posts by category with ID 28 posts of cultura
    this.wpService.getPostsByCategory(28).subscribe((categories) => {
      this.post = categories;
      console.log('Posts by Category:', this.post);
      this.loadPostMetadata(this.post);
    });
    // Fetch posts by category with ID 3 posts of deportes
    this.wpService.getPostsDeportes(3).subscribe((deporte) => {
      this.deportes = deporte;
      console.log('Posts by Category:', this.deportes);
      this.loadPostMetadata(this.deportes);
    });
    // Fetch posts by category with ID 23 posts of tendencia
    this.wpService.getPostsTendencia(23).subscribe((tendencia) => {
      this.tendencia = tendencia;
      console.log('Posts by Category:', this.tendencia);
      this.loadPostMetadata(this.tendencia);
    });
  }

  // Lógica para el movimiento de las tarjetas
  getTransform(index: number): string {
    const totalBanners = this.banners.length;
    const prevIndex = (this.activeIndex - 1 + totalBanners) % totalBanners;
    const nextIndex = (this.activeIndex + 1) % totalBanners;

    if (index === this.activeIndex) {
      return 'translateZ(0)';
    } else if (index === nextIndex) {
      return 'translateZ(-100px) translateX(50px)';
    } else if (index === prevIndex) {
      return 'translateZ(-100px) translateX(-50px)';
    } else {
      return 'translateZ(-200px) scale(0.8)';
    }
  }

  // Lógica para el z-index de las tarjetas
  getZIndex(index: number): number {
    const totalBanners = this.banners.length;
    const prevIndex = (this.activeIndex - 1 + totalBanners) % totalBanners;
    const nextIndex = (this.activeIndex + 1) % totalBanners;

    if (index === this.activeIndex) {
      return 3;
    } else if (index === nextIndex || index === prevIndex) {
      return 2;
    } else {
      return 1;
    }
  }

  showNextCard(): void {
    this.activeIndex = (this.activeIndex + 1) % this.banners.length;
  }

  showPrevCard(): void {
    this.activeIndex =
      (this.activeIndex - 1 + this.banners.length) % this.banners.length;
  }

  // Cargar etiquetas y categorías para cada post
  loadPostMetadata(posts: Post[]): void {
    posts.forEach((post) => {
      // Cargar etiquetas
      if (post.tags && post.tags.length > 0) {
        this.wpService.getPostTags(post.id).subscribe((tags) => {
          this.postTags[post.id] = tags;
        });
      }

      // Cargar categorías
      if (post.categories && post.categories.length > 0) {
        post.categories.forEach((catId) => {
          this.wpService.getCategoryById(catId).subscribe((category) => {
            if (!this.postCategories[post.id]) {
              this.postCategories[post.id] = [];
            }
            this.postCategories[post.id].push(category);
          });
        });
      }
    });
  }

  // Compartir en redes sociales
  shareOnFacebook(post: Post): void {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      this.getPostUrl(post)
    )}`;

    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    } else {
      console.log(
        'Compartir en Facebook no disponible durante el renderizado del servidor'
      );
    }
  }

  shareOnTwitter(post: Post): void {
    const text = post.title.rendered || 'Artículo interesante';
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(this.getPostUrl(post))}`;

    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    } else {
      console.log(
        'Compartir en Twitter no disponible durante el renderizado del servidor'
      );
    }
  }

  shareOnWhatsApp(post: Post): void {
    const text = `${
      post.title.rendered || 'Artículo interesante'
    }: ${this.getPostUrl(post)}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;

    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    } else {
      console.log(
        'Compartir en WhatsApp no disponible durante el renderizado del servidor'
      );
    }
  }

  // Obtener la URL completa del post
  getPostUrl(post: Post): string {
    if (isPlatformBrowser(this.platformId)) {
      return `${window.location.origin}/post/${post.id}/${post.slug}`;
    } else {
      // Para renderizado del lado del servidor, construir una URL a partir de los datos del post
      // Este es un respaldo que será reemplazado con la URL real cuando se hidrate en el navegador
      return `https://maxiradiofm.com/post/${post.id}/${post.slug}`;
    }
  }

  // Detener la propagación del evento para que no se navegue al post al hacer clic en los botones de compartir
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  //Array for the slider
  patrocinadores = [
    {
      src: 'https://wp.maxiradiofm.com/wp-content/uploads/2023/06/Copia-de-250-X-250-Blanco-y-Negro.png',
      alt: 'Logo',
    },
    {
      src: 'https://wp.maxiradiofm.com/wp-content/uploads/2021/04/Fundacion-Castro-Limon.png',
      alt: 'Castro Limón',
    },
    {
      src: 'https://wp.maxiradiofm.com/wp-content/uploads/2023/06/Copia-de-250-X-250-Blanco-y-Negro.png',
      alt: 'Logo',
    },
    {
      src: 'https://wp.maxiradiofm.com/wp-content/uploads/2021/04/El-Trompo.png',
      alt: 'El Trompo',
    },
    {
      src: 'https://wp.maxiradiofm.com/wp-content/uploads/2023/06/Copia-de-250-X-250-Blanco-y-Negro.png',
      alt: 'Logo',
    },
    {
      src: 'https://wp.maxiradiofm.com/wp-content/uploads/2021/04/Toros-de-Tijuana-e1666547425871.png',
      alt: 'Toros de Tijuana',
    },
  ];
}
