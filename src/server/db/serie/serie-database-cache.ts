'use server';

import { unstable_cache } from 'next/cache';
import { cache } from 'react';

import * as serieDatabaseInner from './serie-database-inner';

const REVALIDATE_TIME = 60 * 10; // Revalidate data after 10 minutes

export const getSerieCountCached = async () => {
  const payload = cache(
    unstable_cache(async () => await serieDatabaseInner.getSerieCount(), [], {
      revalidate: REVALIDATE_TIME,
      tags: [`series/count`, '*'],
    }),
  );
  return payload();
};

export const findSerieByIdCached = async (id: string) => {
  const payload = cache(
    unstable_cache(
      async () => await serieDatabaseInner.findSerieById(id),
      [id],
      {
        tags: [`serie`, '*'],
        revalidate: REVALIDATE_TIME,
      },
    ),
  );
  return payload();
};

export const getPopuplarSeriesCached = async (take?: number) => {
  const payload = cache(
    unstable_cache(
      async () => await serieDatabaseInner.getPopuplarSeries(take),
      [String(take)],
      {
        revalidate: REVALIDATE_TIME,
        tags: ['series/popular', '*'],
      },
    ),
  );
  return payload();
};
export const getRecentlyUpdatedSeriesCached = async (take?: number) => {
  const payload = cache(
    unstable_cache(
      async () => await serieDatabaseInner.getRecentlyUpdatedSeries(take),
      [String(take)],
      {
        revalidate: REVALIDATE_TIME,
        tags: ['series/recentlyUpdated', '*'],
      },
    ),
  );
  return payload();
};
export const getRecentlyAddedCached = async (take?: number) => {
  const payload = cache(
    unstable_cache(
      async () => await serieDatabaseInner.getRecentlyAddedSeries(take),
      [String(take)],
      {
        revalidate: REVALIDATE_TIME,
        tags: ['series/recentlyAdded', '*'],
      },
    ),
  );
  return payload();
};
export const getPaginatedSeriesCached = async (data: {
  perPage: number;
  lastElementId?: string;
}) => {
  const payload = cache(
    unstable_cache(
      async () => await serieDatabaseInner.getPaginatedSeries(data),
      [String(data.lastElementId), String(data.perPage)],
      {
        revalidate: REVALIDATE_TIME,
        tags: [`series/paginated`, '*'],
      },
    ),
  );
  return payload();
};
