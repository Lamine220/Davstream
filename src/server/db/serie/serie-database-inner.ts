'use server';

import { Prisma, Serie } from '@prisma/client';
import { revalidateTag } from 'next/cache';

import prisma from '@/lib/prisma';

import {
  MediaBasicSelectType,
  mediaSelect,
} from '../utils/document-select-fields';

// STATS REQUEST
export const getSerieCount = async () => await prisma.serie.count();

// FIND A SINGLE SERIE
export const findSerieById = async (id: string) => {
  return await prisma.serie.findUnique({
    where: { id },
    include: {
      seasons: {
        orderBy: { number: 'asc' },
      },
      watchProviders: true,
      genres: true,
      episodes: {
        orderBy: {
          number: 'asc',
        },
        include: {
          players: {
            orderBy: {
              updatedAt: 'desc',
            },
          },
        },
      },
    },
  });
};
export const findSerieByQuery = async ({
  query,
  limit,
}: {
  query: string;
  limit?: number;
}) => {
  interface ExtendedSearchResuls extends MediaBasicSelectType {
    _id: { $oid: string };
  }

  const data = await prisma.$runCommandRaw({
    aggregate: 'Serie',
    pipeline: [
      {
        $search: {
          index: 'serie_search_index',
          text: {
            query: query,
            path: ['title', 'originalTitle'],
            fuzzy: {},
          },
        },
      },
      {
        $limit: limit,
      },
    ],
    cursor: {},
  });

  let payload = (
    data?.cursor as unknown as { firstBatch: ExtendedSearchResuls[] }
  ).firstBatch;

  return payload.map(item => ({
    id: item._id.$oid,
    tmdbId: item.tmdbId,
    mediaType: item.mediaType,
    title: item.title,
    originalTitle: item.originalTitle,
    releaseYear: item.releaseYear,
    rating: item.rating,
    posterPath: item.posterPath,
    backdropPath: item.backdropPath,
  }));
};

// GET A BUNCH OF SERIES
export const getPopuplarSeries = async (
  take?: number,
): Promise<MediaBasicSelectType[]> => {
  return await prisma.serie.findMany({
    select: mediaSelect,
    orderBy: { popularity: 'desc' },
    take,
  });
};
export const getRecentlyUpdatedSeries = async (
  take?: number,
): Promise<MediaBasicSelectType[]> => {
  return await prisma.serie.findMany({
    select: mediaSelect,
    orderBy: { updatedAt: 'desc' },
    take,
  });
};
export const getRecentlyAddedSeries = async (
  take?: number,
): Promise<MediaBasicSelectType[]> => {
  return await prisma.serie.findMany({
    select: mediaSelect,
    orderBy: { createdAt: 'desc' },
    take,
  });
};
export const getPaginatedSeries = async (data: {
  perPage: number;
  lastElementId?: string;
}): Promise<MediaBasicSelectType[]> => {
  return await prisma.serie.findMany({
    take: data.perPage,
    ...(data.lastElementId && {
      cursor: { id: data.lastElementId },
      skip: 1,
    }),
    orderBy: { popularity: 'desc' },
    select: mediaSelect,
  });
};

// MUTATE A SERIE
export const createOneSerie = async (data: Prisma.SerieCreateInput) => {
  const payload = await prisma.serie.create({
    data,
    select: { id: true },
  });

  revalidateTag(`series/count`);
  revalidateTag(`series/popular`);
  revalidateTag(`series/recentlyUpdated`);
  revalidateTag(`series/recentlyAdded`);

  return payload;
};
export const deleteSerieById = async (id: string) => {
  const payload = await prisma.$transaction(async tx => {
    const serie = await tx.serie.delete({
      where: { id },
      select: { id: true },
    });
    await tx.season.deleteMany({
      where: { serieId: serie.id },
    });
    await tx.episode.deleteMany({
      where: { serieId: serie.id },
    });
    await tx.seriePlayer.deleteMany({
      where: { serieId: serie.id },
    });
  });

  revalidateTag(`series/count`);
  revalidateTag(`series/popular`);
  revalidateTag(`series/recentlyUpdated`);
  revalidateTag(`series/recentlyAdded`);

  return payload;
};
