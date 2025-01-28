import { env } from '@/env.mjs';
import * as tmdbSchema from '@/schema/tmdb';
const BASE_URL = 'https://api.themoviedb.org/3';

const REVALIDATE_TIME = 60 * 10;

const fetcher = async (endpoint: string): Promise<Response> => {
  return await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${env.TMDB_API_TOKEN}`,
    },
    cache: 'force-cache',
    next: { revalidate: REVALIDATE_TIME },
  });
};

export async function getMovieDetails(tmdbId: number) {
  const endpoint = `/movie/${tmdbId}?language=fr-FR`;

  const response = await fetcher(endpoint);
  const payload = await response.json();

  return await tmdbSchema.movieDetailsSchema.parseAsync(payload);
}

export async function getTVShowDetails(tmdbId: number) {
  const endpoint = `/tv/${tmdbId}?language=fr-FR`;

  const response = await fetcher(endpoint);
  const payload = await response.json();

  return await tmdbSchema.tvShowDetailsSchema.parseAsync(payload);
}

export async function searchMovie(data: { query: string; year?: number }) {
  const endpoint = `/movie?query=${data.query}&include_adult=true&language=fr-FR&page=1&year=${data.year}`;

  const response = await fetcher(endpoint);
  const payload = await response.json();

  return await tmdbSchema.movieSearchResponseSchema.parseAsync(payload);
}

export async function searchTVShow(data: { query: string; year?: number }) {
  const endpoint = `/tv?query=${data.query}&include_adult=true&language=en-US&page=1&year=${data.year}`;

  const response = await fetcher(endpoint);
  const payload = await response.json();

  return await tmdbSchema.tvShowSearchResponseSchema.parseAsync(payload);
}

export async function getMovieWatchProviders(tmdbId: number) {
  const endpoint = `/movie/${tmdbId}/watch/providers`;

  const response = await fetcher(endpoint);
  const payload = await response.json();

  return await tmdbSchema.providersResultsSchema.parseAsync(payload);
}

export async function getTVShowWatchProviders(tmdbId: number) {
  const endpoint = `/tv/${tmdbId}/watch/providers`;

  const response = await fetcher(endpoint);
  const payload = await response.json();

  return tmdbSchema.providersResultsSchema.parseAsync(payload);
}
