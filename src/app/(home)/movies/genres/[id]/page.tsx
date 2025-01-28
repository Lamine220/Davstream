import { notFound } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getPaginatedGenreMovies } from '@/server/action/medias';

import GenreInfiniteScroll from '../_components/genre-infinite-scroll';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const GenrePage = async ({ params }: Props) => {
  const { id } = await params;
  if (!id) notFound();

  const genre = await getPaginatedGenreMovies({
    genreId: id,
  });
  if (!genre) return notFound();

  return (
    <div className="container flex min-h-svh flex-col border-x bg-background">
      <Breadcrumb className="py-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{genre.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <GenreInfiniteScroll
        genreId={id}
        data={genre.movies}
        lastElementId={genre.movies.at(-1)?.id}
        fetchAction={getPaginatedGenreMovies}
      />
    </div>
  );
};

export default GenrePage;
