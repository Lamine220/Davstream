import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import MediaCard from '@/components/media-card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import prisma from '@/lib/prisma';

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page: string;
  }>;
};

const getWatchProvider = cache(
  async (tmdbId: number) =>
    await prisma.watchProvider.findUnique({
      where: { tmdbId },
      select: {
        name: true,
        serieIds: true,
        movieIds: true,
      },
    }),
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tmdbId = Number.isNaN(Number(id)) ? notFound() : Number(id);
  const watchProvider = await getWatchProvider(tmdbId);
  if (!watchProvider) return notFound();

  return {
    title: `Tous les films et series de ${watchProvider.name} gratuitement en streaming - Plus de ${watchProvider.movieIds.length} Films et de ${watchProvider.serieIds.length} series en francais `,
    description: `Explorez notre catégorie de series de ${watchProvider.name} en français.`,
  };
}

const GenrePage = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { page } = await searchParams;

  const tmdbId = Number.isNaN(Number(id)) ? notFound() : Number(id);
  if (tmdbId < 1) notFound();

  const perPage = 60;
  const currentPage = Math.max(1, Number(page) || 1);

  const watchProvider = await prisma.watchProvider.findUnique({
    where: { tmdbId },
    select: {
      name: true,
      logoPath: true,
      smallLogo: true,
      series: {
        orderBy: {
          popularity: 'desc',
        },
        take: perPage / 2,
        skip: (perPage / 2) * (currentPage - 1),
      },
      movies: {
        orderBy: {
          popularity: 'desc',
        },
        take: perPage / 2,
        skip: (perPage / 2) * (currentPage - 1),
      },
    },
  });
  if (!watchProvider) notFound();

  const data = [...watchProvider.series, ...watchProvider.movies].sort(
    () => Math.random() - 0.5,
  );

  const counterWatchProvider = await getWatchProvider(tmdbId);
  if (!counterWatchProvider) notFound();
  const totalPages = Math.ceil(
    (counterWatchProvider?.movieIds.length +
      counterWatchProvider?.serieIds.length) /
      perPage,
  );

  return (
    <div className="container flex min-h-svh flex-col border-x bg-background">
      <Breadcrumb className="py-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{watchProvider.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Page {currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="cartoon-grid">
        {data.map(item => (
          <MediaCard
            key={item.id}
            data={item}
            providerLogo={watchProvider.smallLogo || watchProvider.logoPath}
          />
        ))}
      </div>

      <Pagination className="p-4">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`?page=${currentPage - 1}`} />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive={true} href={`?page=${currentPage}`}>
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={`?page=${currentPage + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default GenrePage;
