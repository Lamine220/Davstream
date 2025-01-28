'use server';

import prisma from '@/lib/prisma';

import {
  mediaSelect,
  MovieGenreBasicSelectType,
  movieGenreSelect,
  SerieGenreBasicSelectType,
  serieGenreSelect,
} from '../utils/document-select-fields';

export const getSeriesByGenreId = async (data: {
  genreId: string;
  take?: number;
  lastElementId?: string;
}): Promise<SerieGenreBasicSelectType> => {
  const genre = await prisma.serieGenre.findUnique({
    where: { id: data.genreId },
    select: {
      ...serieGenreSelect,
      series: {
        take: data.take || 18,
        select: mediaSelect,
        orderBy: { popularity: 'desc' },
        ...(data.lastElementId && {
          cursor: { id: data.lastElementId },
          skip: 1,
        }),
      },
    },
  });
  if (!genre) throw new Error(`Genre with ID ${data.genreId} not found`);
  return genre;
};

export const getMoviesByGenreId = async (data: {
  genreId: string;
  take?: number;
  lastElementId?: string;
}): Promise<MovieGenreBasicSelectType> => {
  const genre = await prisma.movieGenre.findUnique({
    where: { id: data.genreId },
    select: {
      ...movieGenreSelect,
      movies: {
        take: data.take,
        select: mediaSelect,
        orderBy: { popularity: 'desc' },
        ...(data.lastElementId && {
          cursor: { id: data.lastElementId },
          skip: 1,
        }),
      },
    },
  });
  if (!genre) throw new Error(`Genre with ID ${data.genreId} not found`);
  return genre;
};

export const getSeriesByGenreSlug = async (data: {
  slug: string;
  take?: number;
}): Promise<SerieGenreBasicSelectType> => {
  const genre = await prisma.serieGenre.findUnique({
    where: { slug: data.slug },
    select: {
      ...serieGenreSelect,
      series: {
        take: data.take || 18,
        select: mediaSelect,
        orderBy: { popularity: 'desc' },
      },
    },
  });
  if (!genre) throw new Error(`Genre with Slug ${data.slug} not found`);
  return genre;
};

export const getMoviesByGenreSlug = async (data: {
  slug: string;
  take?: number;
}): Promise<MovieGenreBasicSelectType> => {
  const genre = await prisma.movieGenre.findUnique({
    where: { slug: data.slug },
    select: {
      ...movieGenreSelect,
      movies: {
        take: data.take || 18,
        select: mediaSelect,
        orderBy: { popularity: 'desc' },
      },
    },
  });
  if (!genre) throw new Error(`Genre with Slug ${data.slug} not found`);
  return genre;
};
