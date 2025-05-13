import { useScrollDirection } from '@/hooks/useScrollDirection';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface CategoryMenuProps {
  categories: string[];
}

export function CategoryMenu({ categories }: CategoryMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const { isScrolled } = useScrollDirection();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
      }
    );

    categories.forEach((category) => {
      const element = document.getElementById(category);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setShowLeftFade(scrollLeft > 0);
        setShowRightFade(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      checkScroll();
      scrollContainer.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, []);

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300',
        !isScrolled && 'translate-y-32 opacity-0 pointer-events-none'
      )}
    >
      <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto max-w-[90vw] scrollbar-hide"
        >
          {categories.map((category, index) => (
            <div key={category} className="flex items-center">
              <button
                onClick={() => scrollToCategory(category)}
                className={cn(
                  'px-4 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                {category}
              </button>
              {index < categories.length - 1 && (
                <div className="w-px h-6 bg-border mx-2" />
              )}
            </div>
          ))}
        </div>
        <div
          className={cn(
            'absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/80 to-transparent pointer-events-none transition-opacity duration-200 rounded-l-full',
            showLeftFade ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div
          className={cn(
            'absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/80 to-transparent pointer-events-none transition-opacity duration-200 rounded-r-full',
            showRightFade ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>
    </div>
  );
}
