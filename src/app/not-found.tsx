'use client';
import { Frown } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <main className="grid min-h-screen place-items-center">
      <div className="container flex max-w-md flex-col items-center justify-center gap-2 text-center">
        <Frown className="size-8" />
        <p className="text-balance">
          Page non trouvée, vérifiez l&apos;URL ou revenez à la page
          d&apos;accueil.
        </p>
        <Button asChild>
          <Link prefetch={false} href="/">
            Page d&apos;accueil
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
