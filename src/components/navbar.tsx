'use client';
import {
  Antenna,
  Clapperboard,
  HandCoins,
  Menu,
  Play,
  Search,
  Tv,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  {
    label: 'Films',
    icon: Clapperboard,
    href: '/movies',
  },
  {
    label: 'Series',
    icon: Tv,
    href: '/series',
  },
  {
    label: 'Chaines',
    icon: Antenna,
    href: '/chaines',
  },
  {
    label: 'Faire un don',
    icon: HandCoins,
    href: '//buymeacoffee.com/nemila',
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky left-0 top-0 z-50 flex h-16 w-full items-center justify-center border-b bg-black/70 backdrop-blur">
      <div className="container flex items-center justify-between">
        <div className="flex-1">
          <Link href={'/'} className="text-xl font-semibold">
            DavStream
          </Link>
        </div>

        <Link href={'/'}>
          <Image src={'/logo.svg'} width={40} height={40} alt="" />
        </Link>

        <div className="hidden flex-1 justify-end gap-6 text-sm md:flex">
          <Link href={'/search'}>Recherche</Link>
          <Link href={'/series'}>Séries</Link>
          <Link href={'/movies'}>Films</Link>
          <Link href={'/'}>Chaines Télé (Bientot)</Link>
        </div>

        <div className="flex flex-1 justify-end gap-2 md:hidden">
          <Button
            asChild
            size={'icon'}
            variant={'ghost'}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <Link href={'/search'}>
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                size={'icon'}
                variant={'ghost'}
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col gap-4">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-center gap-1.5 text-xl font-bold">
                  <span>DavStream</span>
                  <Play className="fill-primary stroke-primary" />
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {navLinks.map(item => (
                  <Button
                    asChild
                    key={item.label}
                    className="justify-start gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </div>

              <footer className="mt-auto text-center text-xs">
                © 2024 davstream.vercel.app | Site Web réalisé par Lamine
                Diamoutene
              </footer>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
