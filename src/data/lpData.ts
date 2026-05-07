import type { Color, Industry, LPItem, Taste } from '../types/lp';

export const INDUSTRIES: Industry[] = ['Beauty', 'Food', 'Stay'];
export const TASTES: Taste[] = ['Pop', 'Simple', 'Luxury', 'Trust'];

export const INDUSTRY_LABELS: Record<Industry, string> = {
  Beauty: '美容',
  Food: '飲食',
  Stay: '宿泊',
};

export const COLOR_LABELS: Record<Color, string> = {
  Red: '赤系',
  Blue: '青系',
  Green: '緑系',
  Monotone: 'モノトーン',
  Colorful: 'カラフル',
};

export const TASTE_LABELS: Record<Taste, string> = {
  Pop: 'ポップ',
  Simple: 'シンプル',
  Luxury: '高級感',
  Trust: '信頼感',
};

const thumb = (slug: string) => ({
  card: `/thumbnails/${slug}-card.webp`,
  pc: `/thumbnails/${slug}-pc.webp`,
  sp: `/thumbnails/${slug}-sp.webp`,
});

export const lpData: LPItem[] = [
  {
    id: 'lp-001',
    title: '創作和食 凪',
    url: 'https://nagi-ec8.pages.dev/',
    thumbnail: thumb('lp-001'),
    categories: {
      industry: 'Food',
    },
    description: '飲食店LP',
  },
  {
    id: 'lp-002',
    title: '創作和食 翡翠',
    url: 'https://hisui-ginza.pages.dev/',
    thumbnail: thumb('lp-002'),
    categories: {
      industry: 'Food',
    },
    description: '飲食店LP',
  },
  {
    id: 'lp-003',
    title: '燈火',
    url: 'https://tomo-shibi.pages.dev/',
    thumbnail: thumb('lp-003'),
    categories: {
      industry: 'Food',
    },
    description: '飲食店LP',
  },
  {
    id: 'lp-004',
    title: 'bakery・ノア',
    url: 'https://bakerynoah.pages.dev/',
    thumbnail: thumb('lp-004'),
    categories: {
      industry: 'Food',
    },
    description: 'パン屋LP',
  },
  {
    id: 'lp-005',
    title: 'アジアンキッチンバレン',
    url: 'https://asian-kitchen-balen.pages.dev/',
    thumbnail: thumb('lp-005'),
    categories: {
      industry: 'Food',
    },
    description: '飲食店LP',
  },
  {
    id: 'lp-006',
    title: 'Bar LUMINE',
    url: 'https://bar-lumine.pages.dev/',
    thumbnail: thumb('lp-006'),
    categories: {
      industry: 'Food',
    },
    description: 'バーLP',
  },
  {
    id: 'lp-007',
    title: 'イタリアンレストラン',
    url: 'https://italian-restaurant.pages.dev/',
    thumbnail: thumb('lp-007'),
    categories: {
      industry: 'Food',
    },
    description: '飲食店LP',
  },
  {
    id: 'lp-008',
    title: 'ペットサロン',
    url: 'https://paws-bloom.pages.dev/',
    thumbnail: thumb('lp-008'),
    categories: {
      industry: 'Beauty',
    },
    description: 'ペットサロンLP',
  },
  {
    id: 'lp-009',
    title: 'プライベートサロン',
    url: 'https://private-beauty.pages.dev/',
    thumbnail: thumb('lp-009'),
    categories: {
      industry: 'Beauty',
    },
    description: 'プライベートサロンLP',
  },
  {
    id: 'lp-010',
    title: 'メンズエステ',
    url: 'https://mens-salon.pages.dev/',
    thumbnail: thumb('lp-010'),
    categories: {
      industry: 'Beauty',
    },
    description: 'メンズエステLP',
  },
  {
    id: 'lp-011',
    title: 'メンズエステ2',
    url: 'https://mens-salon2.pages.dev/',
    thumbnail: thumb('lp-011'),
    categories: {
      industry: 'Beauty',
    },
    description: 'メンズエステLP',
  },
  {
    id: 'lp-012',
    title: '静寂庵',
    url: 'https://yadodemo.pages.dev/',
    thumbnail: thumb('lp-012'),
    categories: {
      industry: 'Stay',
    },
    description: '宿泊施設',
  },
];
