export const dynamic = 'force-dynamic';
import { Suspense } from 'react';

import HeroSection from '@/components/layout/hero';
import MediaCarousel from '@/components/layout/media-carousel';
import WatchProvidersCarousel, {
  WatchProvidersCarouselSkeleton,
} from '@/components/layout/watch-providers-carousel';
import Rating from '@/components/rating';
import MediaGridSkeleton from '@/components/skeletons/media-carousel-skeleton';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import prisma from '@/lib/prisma';
import {
  getPopuplarMoviesCached,
  getRecentlyUpdatedMoviesCached,
} from '@/server/db/movie/movie-database-cache';
import {
  getPopuplarSeriesCached,
  getRecentlyUpdatedSeriesCached,
} from '@/server/db/serie/serie-database-cache';

import MediaGenreFetcher from './_components/media-genre-fetcher';
// import { updatePlayers } from '@/server/commands/players';

const HomePage = async () => {
  // TODO: Connect players to serie with serieId
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroLoader />
      </Suspense>

      <main className="container flex flex-col gap-8 py-4">
        <Suspense fallback={<MediaGridSkeleton />}>
          <PopuplarMovies />
        </Suspense>

        <Suspense fallback={<MediaGridSkeleton />}>
          <PopuplarSeries />
        </Suspense>

        <Suspense fallback={<WatchProvidersCarouselSkeleton />}>
          <Platforms />
        </Suspense>

        <Suspense fallback={<MediaGridSkeleton />}>
          <RecentlyUpdatedMovies />
        </Suspense>

        <Suspense fallback={<MediaGridSkeleton />}>
          <RecentlyUpdatedSeries />
        </Suspense>

        {/* GENRE SECTIONS */}
        <MediaGenreFetcher slug="action" />
        <MediaGenreFetcher slug="aventure" />
        <MediaGenreFetcher slug="action-adventure" isSerie />
        <MediaGenreFetcher slug="comedie" />
        <MediaGenreFetcher slug="comedie" isSerie />
        <MediaGenreFetcher slug="romance" />
        <MediaGenreFetcher slug="horreur" />
        <MediaGenreFetcher slug="mystere" />
        <MediaGenreFetcher slug="mystere" isSerie />
        <MediaGenreFetcher slug="drame" />
        <MediaGenreFetcher slug="drame" isSerie />
        <MediaGenreFetcher slug="guerre" />
        <MediaGenreFetcher slug="war-politics" isSerie />
        <MediaGenreFetcher slug="crime" />
        <MediaGenreFetcher slug="crime" isSerie />
        <MediaGenreFetcher slug="science-fiction" />
        <MediaGenreFetcher slug="fantastique" />
        <MediaGenreFetcher slug="science-fiction-fantastique" isSerie />
        <MediaGenreFetcher slug="documentaire" />
        <MediaGenreFetcher slug="documentaire" isSerie />
        <MediaGenreFetcher slug="talk" isSerie />
        <MediaGenreFetcher slug="reality" isSerie />
        <MediaGenreFetcher slug="familial" />
        <MediaGenreFetcher slug="familial" isSerie />
        <MediaGenreFetcher slug="histoire" />
        <MediaGenreFetcher slug="musique" />
      </main>
    </>
  );
};
export default HomePage;

const Platforms = async () => {
  const providers = await prisma.watchProvider.findMany({
    orderBy: { position: 'asc' },
    where: {
      OR: [
        {
          serieIds: {
            isEmpty: false,
          },
        },
        {
          serieIds: {
            isEmpty: false,
          },
        },
      ],
    },
  });

  return <WatchProvidersCarousel data={providers} />;
};

const HeroSkeleton = () => {
  return (
    <div className="relative flex h-[70vh] items-end justify-center bg-muted bg-cover bg-center">
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-t from-background via-background/30 to-transparent" />

      <div className="container relative z-30 mb-16 flex h-fit max-w-lg flex-col items-center justify-center gap-5 text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <Rating rating={10} />
          <Skeleton className="h-4 w-56" />
        </div>

        <Button disabled>Chargement...</Button>
      </div>
    </div>
  );
};
const HeroLoader = async () => {
  const trendingMovies = await getPopuplarMoviesCached(18);
  return <HeroSection media={trendingMovies.slice(0, 5)} />;
};

// BASIC SECTIONS
const PopuplarMovies = async () => {
  const data = await getPopuplarMoviesCached(18);
  return (
    <MediaCarousel
      media={data}
      title="Films à l'affiche"
      badge="Box Office"
      showLogo
    />
  );
};
const PopuplarSeries = async () => {
  const data = await getPopuplarSeriesCached(18);
  return <MediaCarousel media={data} title="Séries à l'affiche" showLogo />;
};
const RecentlyUpdatedMovies = async () => {
  const data = await getRecentlyUpdatedMoviesCached(18);
  return <MediaCarousel media={data} title="Films ajouts récents" showLogo />;
};
const RecentlyUpdatedSeries = async () => {
  const data = await getRecentlyUpdatedSeriesCached(18);
  return <MediaCarousel media={data} title="Séries ajouts récents" showLogo />;
};
