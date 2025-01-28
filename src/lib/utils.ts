import { Prisma } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import _ from 'lodash';
import { twMerge } from 'tailwind-merge';

import { MovieDetails, TvShowDetails } from '@/schema/tmdb';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractDataFromFilename(filename: string) {
  // Format: Super Mario Bros Movie-MOVIE-54567-S0-E0

  const elements = filename.split('-');
  if (elements.length !== 5) return;

  const title = elements[0].toLowerCase();

  const type = elements[1].toUpperCase();
  if (type !== 'MOVIE' && type !== 'TV') return;

  const tmdbId = Number(elements[2]);
  const seasonNumber = Number(elements[3].replace('S', ''));
  const episodeNumber = Number(elements[4].replace('E', ''));

  if (
    Number.isNaN(tmdbId) ||
    Number.isNaN(seasonNumber) ||
    Number.isNaN(episodeNumber) ||
    tmdbId < 1
  )
    return;

  return { title, type, tmdbId, seasonNumber, episodeNumber };
}

export function mapTmdbToSeriesData(
  tmdbData: TvShowDetails,
): Prisma.SerieCreateInput {
  return {
    tmdbId: tmdbData.id,
    releaseYear: tmdbData.first_air_date
      ? new Date(tmdbData.first_air_date).getFullYear()
      : 0,
    title: tmdbData.name,
    originalTitle: tmdbData.original_name,
    popularity: tmdbData.popularity || 0,
    overview: tmdbData.overview,
    mediaType: 'SERIE',
    rating: tmdbData.vote_average || 0,
    posterPath: tmdbData.poster_path
      ? `https://image.tmdb.org/t/p/original${tmdbData.poster_path}`
      : undefined,
    backdropPath: tmdbData?.backdrop_path
      ? `https://image.tmdb.org/t/p/original${tmdbData.backdrop_path}`
      : undefined,
    genres: {
      connectOrCreate: tmdbData.genres?.map(genre => ({
        where: { tmdbId: genre.id },
        create: {
          tmdbId: genre.id,
          name: genre.name,
          slug: _.kebabCase(genre.name),
        },
      })),
    },
  };
}

export function mapTmdbToMovieData(
  tmdbData: MovieDetails,
): Prisma.MovieCreateInput {
  return {
    tmdbId: tmdbData.id,
    backdropPath: tmdbData.backdrop_path
      ? `http://image.tmdb.org/t/p/original${tmdbData.backdrop_path}`
      : undefined,
    originalTitle: tmdbData.original_title,
    overview: tmdbData?.overview ?? '',
    popularity: tmdbData?.popularity ?? 0,
    posterPath: tmdbData?.poster_path
      ? `http://image.tmdb.org/t/p/original${tmdbData.poster_path}`
      : undefined,
    rating: tmdbData?.vote_average ?? 0,
    releaseYear: tmdbData.release_date
      ? new Date(tmdbData.release_date).getFullYear()
      : 0,
    title: tmdbData.title,
    genres: {
      connectOrCreate: tmdbData?.genres?.map(genre => ({
        create: {
          tmdbId: genre.id,
          name: genre.name,
          slug: _.kebabCase(genre.name),
        },
        where: { tmdbId: genre.id },
      })),
    },
  };
}
