'use server';

import { unstable_cache } from 'next/cache';
import { cache } from 'react';

import * as movieDatabaseInner from './movie-database-inner';

const REVALIDATE_TIME = 60 * 10; // Revalidate data after 10 minutes

export const getMovieCountCached = async () => {
  const payload = cache(
    unstable_cache(async () => await movieDatabaseInner.getMovieCount(), [], {
      revalidate: REVALIDATE_TIME,
      tags: [`movies/count`, '*'],
    }),
  );
  return payload();
};

export const findMovieByIdCached = async (id: string) => {
  const payload = cache(
    unstable_cache(
      async () => await movieDatabaseInner.findMovieById(id),
      [id],
      {
        tags: [`movie`, '*'],
        revalidate: REVALIDATE_TIME,
      },
    ),
  );
  return payload();
};

export const getPopuplarMoviesCached = async (take?: number) => {
  const payload = cache(
    unstable_cache(
      async () => await movieDatabaseInner.getPopuplarMovies(take),
      [String(take)],
      {
        revalidate: REVALIDATE_TIME,
        tags: ['movies/popular', '*'],
      },
    ),
  );
  return payload();
};
export const getRecentlyUpdatedMoviesCached = async (take?: number) => {
  const payload = cache(
    unstable_cache(
      async () => await movieDatabaseInner.getRecentlyUpdatedMovies(take),
      [String(take)],
      {
        revalidate: REVALIDATE_TIME,
        tags: ['movies/recentlyUpdated', '*'],
      },
    ),
  );
  return payload();
};
export const getRecentlyAddedMoviesCached = async (take?: number) => {
  const payload = cache(
    unstable_cache(
      async () => await movieDatabaseInner.getRecentlyAddedMovies(take),
      [String(take)],
      {
        revalidate: REVALIDATE_TIME,
        tags: ['movies/recentlyAdded', '*'],
      },
    ),
  );
  return payload();
};
export const getPaginatedMoviesCached = async (data: {
  perPage: number;
  lastElementId?: string;
}) => {
  const payload = cache(
    unstable_cache(
      async () => await movieDatabaseInner.getPaginatedMovies(data),
      [String(data.lastElementId), String(data.perPage)],
      {
        revalidate: REVALIDATE_TIME,
        tags: [`movies/paginated`, '*'],
      },
    ),
  );
  return payload();
};
