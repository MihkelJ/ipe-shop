import { CategoryMenu } from '@/components/CategoryMenu';
import { ShopCard } from '@/components/ShopCard';
import { CATEGORY_CONFIG, STORE_CONFIG } from '@/constants';
import type { StoreItem } from '@/types';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const sortedByCategory = [...STORE_CONFIG].sort((a, b) => {
    const orderA = CATEGORY_CONFIG[a.category]?.order ?? 999;
    const orderB = CATEGORY_CONFIG[b.category]?.order ?? 999;
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
        {Object.entries(groupedItems).map(([category, items]) => {
          const categoryConfig = CATEGORY_CONFIG[category] || {
            title: category.charAt(0).toUpperCase() + category.slice(1),
            description: `Browse our ${category} collection`,
          };

          return (
            <div key={category} id={category} className="mb-12 scroll-mt-32">
              <div className="mb-6">
                <h2 className="text-3xl font-bold capitalize text-white">
                  {categoryConfig.title}
                </h2>
                <p className="text-lg text-white/80 mt-2">
                  {categoryConfig.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <ShopCard key={item.name} {...item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
