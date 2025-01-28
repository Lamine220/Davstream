'use client';
import { Frown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  return (
    <main className="grid min-h-screen flex-1 place-items-center">
      <div className="container flex max-w-md flex-col items-center justify-center gap-3 text-center">
        <Frown className="size-8" />
        <p className="text-balance">
          Une erreur s&apos;est produite. Veuillez réessayer ou revenir à la
          page d&apos;accueil.
        </p>
        <Button asChild>
          <Link prefetch={false} href="/">
            Accueil
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default ErrorPage;
