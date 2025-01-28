import Link from 'next/link';
import { notFound } from 'next/navigation';

import DetailsSection from '@/app/(home)/_components/details-section';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
import { findSerieByIdCached } from '@/server/db/serie/serie-database-cache';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const SerieDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  if (!id) notFound();

  const serie = await findSerieByIdCached(id);
  if (!serie) notFound();

  return (
    <main className="container flex flex-col gap-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/series">Series</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={'#'}>{serie.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DetailsSection media={serie} />

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {serie.seasons.map(season => {
          const firstEpisode = serie.episodes.find(
            episode => episode.seasonNumber === season.number,
          );

          return (
            <Link
              prefetch={false}
              href={`${id}/${season.number}/${firstEpisode?.number || 1}`}
              key={season.id}
            >
              <Card className="flex aspect-video items-center justify-center bg-muted/50 p-4 text-xl font-semibold">
                Saison {season.number}
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default SerieDetailsPage;
