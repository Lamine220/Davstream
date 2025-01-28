import { z } from 'zod';

const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

const movieSearchResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

const tvShowSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  first_air_date: z.string(),
  name: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
});

const tvShowSearchResponseSchema = z.object({
  page: z.number(),
  results: z.array(tvShowSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

const creatorSchema = z.object({
  id: z.number(),
  credit_id: z.string(),
  name: z.string(),
  gender: z.number(),
  profile_path: z.string().nullable(),
});

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const episodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  air_date: z.string(),
  episode_number: z.number(),
  production_code: z.string(),
  runtime: z.number().nullable(),
  season_number: z.number(),
  show_id: z.number(),
  still_path: z.string().nullable(),
});

const networkSchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

const productionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

const productionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

const seasonSchema = z.object({
  air_date: z.string().nullable(),
  episode_count: z.number(),
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  season_number: z.number(),
  vote_average: z.number(),
});

const spokenLanguageSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
});

const tvShowDetailsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  created_by: z.array(creatorSchema).nullable(),
  episode_run_time: z.array(z.number()).nullable(),
  first_air_date: z.string().nullable(),
  genres: z.array(genreSchema).nullable(),
  homepage: z.string().nullable(),
  id: z.number(),
  in_production: z.boolean().nullable(),
  languages: z.array(z.string()).nullable(),
  last_air_date: z.string().nullable(),
  last_episode_to_air: episodeSchema.nullable(),
  name: z.string(),
  next_episode_to_air: episodeSchema.nullable(),
  networks: z.array(networkSchema).nullable(),
  number_of_episodes: z.number().nullable(),
  number_of_seasons: z.number().nullable(),
  origin_country: z.array(z.string()).nullable(),
  original_language: z.string().nullable(),
  original_name: z.string(),
  overview: z.string().nullable(),
  popularity: z.number().nullable(),
  poster_path: z.string().nullable(),
  production_companies: z.array(productionCompanySchema).nullable(),
  production_countries: z.array(productionCountrySchema).nullable(),
  seasons: z.array(seasonSchema).nullable(),
  spoken_languages: z.array(spokenLanguageSchema).nullable(),
  status: z.string(),
  tagline: z.string().nullable(),
  type: z.string(),
  vote_average: z.number().nullable(),
  vote_count: z.number().nullable(),
});

const movieDetailsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z.object({}).nullable(),
  budget: z.number().nullable(),
  genres: z.array(genreSchema).nullable(),
  homepage: z.string().nullable(),
  id: z.number(),
  imdb_id: z.string().nullable(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string().nullable(),
  popularity: z.number().nullable(),
  poster_path: z.string().nullable(),
  production_companies: z.array(productionCompanySchema).nullable(),
  production_countries: z.array(productionCountrySchema).nullable(),
  release_date: z.string().nullable(),
  revenue: z.number().nullable(),
  runtime: z.number().nullable(),
  spoken_languages: z.array(spokenLanguageSchema).nullable(),
  status: z.string(),
  tagline: z.string().nullable(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number().nullable(),
  vote_count: z.number().nullable(),
});

const providerSchema = z.object({
  logo_path: z.string(),
  provider_id: z.number(),
  provider_name: z.string(),
  display_priority: z.number(),
});

const localeSchema = z.object({
  link: z.string().optional(),
  flatrate: z.array(providerSchema).optional(),
  rent: z.array(providerSchema).optional(),
  buy: z.array(providerSchema).optional(),
});

const providersResultsSchema = z.object({
  id: z.number().optional(),
  results: z
    .object({
      FR: localeSchema.optional(),
      US: localeSchema.optional(),
    })
    .optional(),
});

// Export types inferred from the schemas
export type Movie = z.infer<typeof movieSchema>;
export type MovieSearchResponse = z.infer<typeof movieSearchResponseSchema>;
export type TvShow = z.infer<typeof tvShowSchema>;
export type TvShowSearchResponse = z.infer<typeof tvShowSearchResponseSchema>;
export type TvShowDetails = z.infer<typeof tvShowDetailsSchema>;
export type MovieDetails = z.infer<typeof movieDetailsSchema>;
export type Provider = z.infer<typeof providerSchema>;
export type Locale = z.infer<typeof localeSchema>;

// Export the schemas
export {
  localeSchema,
  movieDetailsSchema,
  movieSchema,
  movieSearchResponseSchema,
  providerSchema,
  providersResultsSchema,
  tvShowDetailsSchema,
  tvShowSchema,
  tvShowSearchResponseSchema,
};
