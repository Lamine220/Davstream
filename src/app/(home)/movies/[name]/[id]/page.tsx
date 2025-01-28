import { notFound } from 'next/navigation';

import Player from '@/components/player';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { findMovieByIdCached } from '@/server/db/movie/movie-database-cache';

import DetailsSection from '../../../_components/details-section';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  if (!id) notFound();

  const movie = await findMovieByIdCached(id);
  if (!movie) notFound();

  return (
    <main className="container flex flex-col gap-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/movies">Films</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`#`}>{movie.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Player downloadLinks={movie.downloadLinks} players={movie.players} />
      <DetailsSection media={movie} />
    </main>
  );
};

export default Page;
