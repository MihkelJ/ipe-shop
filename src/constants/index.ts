import type { CategoryConfig, StoreItem } from '@/types';

export const STORE_CONFIG = JSON.parse(
  import.meta.env.VITE_STORE_CONFIG
) as StoreItem[];

export const CATEGORY_CONFIG = JSON.parse(
  import.meta.env.VITE_CATEGORY_CONFIG
) as Record<string, CategoryConfig>;
