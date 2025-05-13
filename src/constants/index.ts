import type { StoreItem, StoreOrder } from '@/types';

export const STORE_CONFIG = JSON.parse(
  import.meta.env.VITE_STORE_CONFIG
) as StoreItem[];

export const STORE_ORDER = JSON.parse(
  import.meta.env.VITE_STORE_CATEGORY_ORDER
) as StoreOrder;
