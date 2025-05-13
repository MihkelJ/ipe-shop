# IPE Shop

A simple e-commerce platform for IPE City vendors to sell their products and services.

## Configuration

The application uses environment variables for configuration. Here's how to set up your environment:

### Store Configuration

The `VITE_STORE_CONFIG` environment variable contains an array of product configurations. Each product has the following structure:

```typescript
{
  name: string; // Product name
  description: string; // Product description
  price: number; // Product price
  currency: string; // Currency code (BRL or USD)
  emoji: string; // Product emoji
  inStock: boolean; // Product availability
  category: string; // Product category
  seller: string; // Seller's ENS name
  sellerTelegram: string; // Seller's Telegram handle
}
```

Example configuration:

```json
[
  {
    "name": "Large Meal",
    "description": "600g of delicious food",
    "price": 60,
    "currency": "BRL",
    "emoji": "🍛",
    "inStock": true,
    "category": "julia",
    "seller": "juliapaiva.ipecity.eth",
    "sellerTelegram": "juliapaiv"
  },
  {
    "name": "BluBlooded 30ml",
    "description": "BluBlooded Small. 20% discount (23.2 USD vs 29 USD).",
    "price": 23.2,
    "currency": "USD",
    "emoji": "🧢",
    "inStock": true,
    "category": "blublooded",
    "seller": "blublooded.ipecity.eth",
    "sellerTelegram": "alekssvetski"
  }
]
```

### Category Order

The `VITE_STORE_CATEGORY_ORDER` environment variable defines the display order of categories in the store. Categories are ordered by their numeric values, with lower numbers appearing first.

Example:

```json
{
  "founderhaus": 1,
  "julia": 2,
  "blublooded": 3,
  "livia": 4,
  "agroverse": 5
}
```

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in a `.env` file
4. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.
