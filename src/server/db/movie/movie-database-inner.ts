'use server';

import { Movie, Prisma } from '@prisma/client';
import { revalidateTag } from 'next/cache';

import prisma from '@/lib/prisma';

import {
  MediaBasicSelectType,
  mediaSelect,
} from '../utils/document-select-fields';

// STATS REQUEST
export const getMovieCount = async () => await prisma.movie.count();

// FIND A SINGLE MOVIE
export const findMovieById = async (id: string) => {
  return await prisma.movie.findUnique({
    where: { id },
    include: {
      players: {
        orderBy: {
          updatedAt: 'desc',
        },
      },
      watchProviders: true,
      genres: true,
    },
  });
};

export const findMovieByQuery = async ({
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
    aggregate: 'Movie',
    pipeline: [
      {
        $search: {
          index: 'movie_search_index',
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

// GET A BUNCH OF MOVIES
export const getPopuplarMovies = async (
  take?: number,
): Promise<MediaBasicSelectType[]> => {
  return await prisma.movie.findMany({
    select: mediaSelect,
    orderBy: { popularity: 'desc' },
    take,
  });
};
export const getRecentlyUpdatedMovies = async (
  take?: number,
): Promise<MediaBasicSelectType[]> => {
  return await prisma.movie.findMany({
    select: mediaSelect,
    orderBy: { updatedAt: 'desc' },
    take,
  });
};
export const getRecentlyAddedMovies = async (
  take?: number,
): Promise<MediaBasicSelectType[]> => {
  return await prisma.movie.findMany({
    select: mediaSelect,
    orderBy: { createdAt: 'desc' },
    take,
  });
};
export const getPaginatedMovies = async (data: {
  perPage: number;
  lastElementId?: string;
}): Promise<MediaBasicSelectType[]> => {
  return await prisma.movie.findMany({
    take: data.perPage,
    ...(data.lastElementId && {
      cursor: { id: data.lastElementId },
      skip: 1,
    }),
    orderBy: { popularity: 'desc' },
    select: mediaSelect,
  });
};

// MUTATE A MOVIE
export const createOneMovie = async (data: Prisma.MovieCreateInput) => {
  const payload = await prisma.movie.create({
    data,
    select: { id: true },
  });

  revalidateTag(`movies/count`);
  revalidateTag(`movies/popular`);
  revalidateTag(`movies/recentlyUpdated`);
  revalidateTag(`movies/recentlyAdded`);

  return payload;
};
export const deleteMovieById = async (id: string) => {
  const payload = await prisma.$transaction(async tx => {
    const movie = await tx.movie.delete({
      where: { id },
      select: { id: true },
    });
    await tx.moviePlayer.deleteMany({
      where: { movieId: movie.id },
    });
  });

  revalidateTag(`movies/count`);
  revalidateTag(`movies/popular`);
  revalidateTag(`movies/recentlyUpdated`);
  revalidateTag(`movies/recentlyAdded`);

  return payload;
};
