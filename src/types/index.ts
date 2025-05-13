export interface StoreItem {
  name: string;
  description: string;
  price: number;
  currency: string;
  emoji: string;
  inStock: boolean;
  category: string;
  seller: string;
  sellerTelegram: string;
}

export interface StoreOrder {
  [key: string]: number;
}
