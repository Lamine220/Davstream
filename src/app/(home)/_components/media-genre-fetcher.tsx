'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import MediaCarousel from '@/components/layout/media-carousel';
import MediaGridSkeleton from '@/components/skeletons/media-carousel-skeleton';
import {
  getMoviesByGenreSlugCached,
  getSeriesByGenreSlugCached,
} from '@/server/db/genre/genre-database-cache';
import {
  MovieGenreBasicSelectType,
  SerieGenreBasicSelectType,
} from '@/server/db/utils/document-select-fields';

type Props = {
  slug: string;
  take?: number;
  isSerie?: boolean;
};

type Genre = MovieGenreBasicSelectType | SerieGenreBasicSelectType;

const MediaGenreFetcher = ({ slug, take, isSerie }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '500px 0px',
  });

  const [data, setData] = useState<Genre>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      try {
        setIsLoading(true);
        let fetchedData;

        if (isSerie) {
          fetchedData = await getSeriesByGenreSlugCached({ slug, take });
          if (fetchedData.series.length <= 0)
            throw new Error('Empty serie array for genres');
        } else {
          fetchedData = await getMoviesByGenreSlugCached({ slug, take });
          if (fetchedData.movies.length <= 0)
            throw new Error('Empty movie array for genres');
        }
        setData(fetchedData);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    if (inView) fetcher();
  }, [inView, slug, take, isSerie]);

  if (isError) return;
  if (!isLoading && !data) return;

  return (
    <div ref={ref}>
      {isLoading || !data ? (
        <MediaGridSkeleton />
      ) : (
        <MediaCarousel
          media={'series' in data ? data.series : data.movies}
          title={`${isSerie ? 'Séries' : 'Films'} ${data.name}`}
          description={''}
          extraLink={{
            href: `/${isSerie ? 'series' : 'movies'}/genres/${data.id}`,
            label: 'Voir Plus',
          }}
          showLogo
        />
      )}
    </div>
  );
};

export default MediaGenreFetcher;
