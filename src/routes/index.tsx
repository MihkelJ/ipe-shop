import { CategoryMenu } from '@/components/CategoryMenu';
import { ShopCard } from '@/components/ShopCard';
import { STORE_CONFIG, STORE_ORDER } from '@/constants';
import type { StoreItem } from '@/types';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const sortedByCategory = [...STORE_CONFIG].sort((a, b) => {
    const orderA = STORE_ORDER[a.category] ?? 999;
    const orderB = STORE_ORDER[b.category] ?? 999;
    return orderA - orderB;
  });

  const groupedItems = sortedByCategory.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, StoreItem[]>
  );

  const categories = Object.keys(groupedItems);

  return (
    <div
      className="min-h-screen py-8 pt-24 relative px-4"
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <CategoryMenu categories={categories} />
      <div className="container mx-auto relative z-10">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} id={category} className="mb-12 scroll-mt-32">
            <h2 className="text-3xl font-bold mb-6 capitalize text-white">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ShopCard key={item.name} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
