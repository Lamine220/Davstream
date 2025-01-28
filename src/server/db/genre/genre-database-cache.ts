'use server';

import { unstable_cache } from 'next/cache';
import { cache } from 'react';

import * as genreDatabaseInner from './genre-database-inner';

const REVALIDATE_TIME = 60 * 10; // Revalidate data after 10 minutes

export const getSeriesByGenreIdCached = async (data: {
  genreId: string;
  take?: number;
  lastElementId?: string;
}) => {
  const payload = cache(
    unstable_cache(
      async () => await genreDatabaseInner.getSeriesByGenreId(data),
      [data.genreId, String(data.take), String(data.lastElementId)],
      {
        revalidate: REVALIDATE_TIME,
        tags: [`series:genre`, '*'],
      },
    ),
  );
  return payload();
};

export const getMoviesByGenreIdCached = async (data: {
  genreId: string;
  take?: number;
  lastElementId?: string;
}) => {
  const payload = cache(
    unstable_cache(
      async () => await genreDatabaseInner.getMoviesByGenreId(data),
      [data.genreId, String(data.take), String(data.lastElementId)],
      {
        revalidate: REVALIDATE_TIME,
        tags: [`movies:genre`, '*'],
      },
    ),
  );

  return payload();
};

export const getSeriesByGenreSlugCached = async (data: {
  slug: string;
  take?: number;
}) => {
  const payload = cache(
    unstable_cache(
      async () => await genreDatabaseInner.getSeriesByGenreSlug(data),
      [data.slug, String(data.take)],
      {
        revalidate: REVALIDATE_TIME,
        tags: [`series:genre`, '*'],
      },
    ),
  );
  return payload();
};

export const getMoviesByGenreSlugCached = async (data: {
  slug: string;
  take?: number;
}) => {
  const payload = cache(
    unstable_cache(
      async () => await genreDatabaseInner.getMoviesByGenreSlug(data),
      [data.slug, String(data.take)],
      {
        revalidate: REVALIDATE_TIME,
        tags: [`movies:genre`, '*'],
      },
    ),
  );
  return payload();
};
