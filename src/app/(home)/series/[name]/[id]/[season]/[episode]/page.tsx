import { Episode } from '@prisma/client';
import _ from 'lodash';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Player from '@/components/player';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { findSerieByIdCached } from '@/server/db/serie/serie-database-cache';

type Props = {
  params: Promise<{
    id: string;
    season: string;
    episode: string;
  }>;
};

const SerieStreamingPage = async ({ params }: Props) => {
  const { id, episode: episodeString, season: seasonString } = await params;
  if (!id) notFound();

  const serie = await findSerieByIdCached(id);
  if (!serie) notFound();

  const episodeNumber = Number(episodeString);
  const seasonNumber = Number(seasonString);
  if (Number.isNaN(seasonNumber) || Number.isNaN(episodeNumber)) notFound();

  const episodes = serie.episodes.filter(
    item => item.seasonNumber === seasonNumber,
  );
  const episode = episodes.find(item => item.number === episodeNumber);

  return (
    <main className="container flex flex-col gap-4 pb-4">
      <Breadcrumb className="pt-4">
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
            <BreadcrumbLink
              href={`/series/${_.kebabCase(serie.title)}/${serie.id}`}
            >
              {serie.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`#`}>Saison {seasonNumber}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`#`}>Episode {episodeNumber}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {episode && (
        <Player
          downloadLinks={episode.downloadLinks}
          players={episode.players}
        />
      )}

      <div className="grid grid-cols-6 gap-2 md:grid-cols-8 lg:grid-cols-12">
        {episodes.map((item: Episode) => (
          <Button
            asChild
            key={item.id}
            variant={'outline'}
            className={cn(item.number === episodeNumber && 'bg-muted')}
          >
            <Link prefetch={false} href={`${item.number}`}>
              {item.number}
            </Link>
          </Button>
        ))}
      </div>
    </main>
  );
};

export default SerieStreamingPage;
