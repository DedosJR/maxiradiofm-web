export interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };

  slug: string;
  date: string;
  categories: number[];
  tags: number[];
  featured_media: number;
  yoast_head_json?: {
    og_image?: { url: string }[];
    og_description?: string;
    og_title?: string;
    og_url?: string;
  };
  _embedded: {
    'wp:featuredmedia': [
      {
        source_url: string;
        alt_text?: string;
        media_details?: {
          sizes: {
            full: {
              source_url: string;
            };
            medium: {
              source_url: string;
            };
          };
        };
      }
    ];
    'wp:term'?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: 'category' | 'post_tag';
      }>
    >;
  };
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}
