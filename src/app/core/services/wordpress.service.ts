import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/apis';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class WordpressService {
  constructor(private http: HttpClient) {}

  /*getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${API_URL}/posts?_embed&per_page=3`);
  }
    */
  getPosts(categoryId: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${API_URL}/posts?categories=${categoryId}&_embed&per_page=3`
    );
  }

  getPostsByCategory(categoryId: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${API_URL}/posts?categories=${categoryId}&_embed&per_page=3`
    );
  }
  /*getPostsByCategory(categoryId: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${API_URL}/posts?categories=${categoryId}&_embed`
    );
  }
    */

  getPostsDeportes(deportesId: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${API_URL}/posts?categories=${deportesId}&_embed&per_page=4`
    );
  }
  getPostsTendencia(tendenciaId: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${API_URL}/posts?categories=${tendenciaId}&_embed&per_page=3`
    );
  }
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${API_URL}/posts/${id}?_embed`);
  }

  // Obtener las etiquetas (tags) de un post
  getPostTags(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/tags?post=${postId}`);
  }

  // Obtener información de una categoría por su ID
  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/categories/${categoryId}`);
  }
}
