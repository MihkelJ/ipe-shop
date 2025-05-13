import { useScrollDirection } from '@/hooks/useScrollDirection';
import { cn } from '@/lib/utils';
import Logo from '../../public/logo.svg';

export default function Header() {
  const { isScrolled } = useScrollDirection();

  return (
    <header
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg transition-all duration-300',
        isScrolled && '-translate-y-32'
      )}
    >
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <img
              src={Logo}
              alt="IPE Shop Logo"
              className="h-8 w-8 rounded-lg"
            />
            <span className="font-bold">Ipê City - Marketplace</span>
          </a>
        </div>
      </div>
    </header>
  );
}
