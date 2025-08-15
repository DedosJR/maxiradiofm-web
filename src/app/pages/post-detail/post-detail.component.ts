import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressService } from '../../core/services/wordpress.service';
import { Post, Tag, Category } from '../../core/models/post.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post?: Post;
  tags: Tag[] = [];
  categories: Category[] = [];
  shareUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private wpService: WordpressService,
    private meta: Meta,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Solo acceder al objeto window si estamos en un entorno de navegador
    if (isPlatformBrowser(this.platformId)) {
      this.shareUrl = window.location.href;
    } else {
      // Para renderizado del lado del servidor, construir una URL a partir de los datos de la ruta
      // Este es un respaldo que será reemplazado con la URL real cuando se hidrate en el navegador
      this.shareUrl = `https://maxiradiofm.com/post/${id}`;
    }

    this.wpService.getPostById(id).subscribe((post) => {
      if (!post) return;

      this.post = post;

      // Cambiar título de la pestaña
      this.titleService.setTitle(`${post.title.rendered} | MaxiRadioFM`);

      const cleanDescription = post.excerpt.rendered
        .replace(/(<([^>]+)>)/gi, '')
        .trim();

      const imageUrl =
        post._embedded['wp:featuredmedia'][0].source_url ||
        'assets/album_art.png';
      const shareTitle = post.yoast_head_json?.og_title || post.title.rendered;
      const shareDescription =
        post.yoast_head_json?.og_description || post.excerpt.rendered;

      // --- META TAGS Open Graph ---
      this.meta.updateTag({
        property: 'og:title',
        content: post.title.rendered,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: cleanDescription,
      });
      this.meta.updateTag({ property: 'og:image', content: String(imageUrl) });
      this.meta.updateTag({ property: 'og:url', content: this.shareUrl });
      this.meta.updateTag({ property: 'og:type', content: 'article' });
      this.meta.updateTag({
        property: 'fb:app_id',
        content: '1065429313602638',
      });

      // --- META TAGS Twitter Card ---
      this.meta.updateTag({
        name: 'twitter:card',
        content: 'summary_large_image',
      });
      this.meta.updateTag({
        name: 'twitter:title',
        content: post.title.rendered,
      });
      this.meta.updateTag({
        name: 'twitter:description',
        content: cleanDescription,
      });
      this.meta.updateTag({ name: 'twitter:image', content: String(imageUrl) });
      this.meta.updateTag({ name: 'twitter:site', content: '@MaxiradioFM' });

      // Cargar etiquetas
      if (post.tags?.length > 0) {
        this.loadTags(post.id);
      }

      // Cargar categorías
      if (post.categories?.length > 0) {
        this.loadCategories(post.categories);
      }
    });
  }

  loadTags(postId: number): void {
    this.wpService.getPostTags(postId).subscribe((tags) => {
      this.tags = tags;
    });
  }

  loadCategories(categoryIds: number[]): void {
    categoryIds.forEach((catId) => {
      this.wpService.getCategoryById(catId).subscribe((category) => {
        this.categories.push(category);
      });
    });
  }

  shareOnFacebook(): void {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      this.shareUrl
    )}`;
    this.openShareWindow(url);
  }

  shareOnTwitter(): void {
    const text = this.post?.title.rendered || 'Artículo interesante';
    const hashtags = this.tags
      .slice(0, 2)
      .map((tag) => tag.name.replace(/\s+/g, ''))
      .join(',');

    let url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(this.shareUrl)}`;

    if (hashtags) {
      url += `&hashtags=${encodeURIComponent(hashtags)}`;
    }

    url += `&via=MaxiradioFM`;

    this.openShareWindow(url);
  }

  shareOnWhatsApp(): void {
    const text = `${this.post?.title.rendered || 'Artículo interesante'}: ${
      this.shareUrl
    }`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    this.openShareWindow(url);
  }

  private openShareWindow(url: string): void {
    // Solo ejecutar en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const width = 600;
      const height = 400;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;

      window.open(
        url,
        'share',
        `toolbar=no, location=no, status=no, menubar=no, scrollbars=no, resizable=no, width=${width}, height=${height}, top=${top}, left=${left}`
      );
    } else {
      // En el servidor, no hacemos nada ya que no podemos abrir ventanas
      console.log('Compartir no disponible durante el renderizado del servidor');
    }
  }
}
