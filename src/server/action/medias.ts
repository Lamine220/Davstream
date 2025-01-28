'use server';
import Fuse from 'fuse.js';
import {
  getMoviesByGenreIdCached,
  getSeriesByGenreIdCached,
} from '@/server/db/genre/genre-database-cache';
import { getPaginatedMoviesCached } from '@/server/db/movie/movie-database-cache';
import { findMovieByQuery } from '@/server/db/movie/movie-database-inner';
import { getPaginatedSeriesCached } from '@/server/db/serie/serie-database-cache';
import { findSerieByQuery } from '@/server/db/serie/serie-database-inner';

export const searchMedia = async (query: string) => {
  const [movieSearchResult, serieSearchResults] = await Promise.all([
    findMovieByQuery({ query, limit: 18 }),
    findSerieByQuery({ query, limit: 18 }),
  ]);
  const fuse = new Fuse([...movieSearchResult, ...serieSearchResults], {
    keys: ['title', 'originalTitle'],
  });
  const payload = fuse.search(query);
  return payload.map(item => item.item);
};

// MEDIA PAGINATION
export const getPaginatedMovies = async (lastElementId?: string) => {
  const movies = await getPaginatedMoviesCached({
    lastElementId,
    perPage: 36,
  });
  return movies;
};
export const getPaginatedSeries = async (lastElementId?: string) => {
  const movies = await getPaginatedSeriesCached({
    lastElementId,
    perPage: 36,
  });
  return movies;
};

// GENRE PAGINATION
export const getPaginatedGenreSeries = async ({
  genreId,
  lastElementId,
}: {
  genreId: string;
  lastElementId?: string;
}) => {
  const data = await getSeriesByGenreIdCached({
    genreId,
    lastElementId,
    take: 36,
  });
  return data;
};
export const getPaginatedGenreMovies = async ({
  genreId,
  lastElementId,
}: {
  genreId: string;
  lastElementId?: string;
}) => {
  const data = await getMoviesByGenreIdCached({
    genreId,
    lastElementId,
    take: 36,
  });
  return data;
};
