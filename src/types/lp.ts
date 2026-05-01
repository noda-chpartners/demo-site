export type Industry = 'Beauty' | 'Food' ;
export type Color = 'Red' | 'Blue' | 'Green' | 'Monotone' | 'Colorful';
export type Taste = 'Pop' | 'Simple' | 'Luxury' | 'Trust';

export interface LPItem {
  id: string;
  title: string;
  url: string;
  thumbnail: {
    card: string;
    pc: string;
    sp: string;
  };
  categories: {
    industry: Industry;
  };
  description?: string;
}