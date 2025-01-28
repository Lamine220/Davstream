import { Prisma } from '@prisma/client';

// RE-USED FOR SERIES
export const mediaSelect = {
  id: true,
  tmdbId: true,
  posterPath: true,
  rating: true,
  mediaType: true,
  title: true,
  originalTitle: true,
  releaseYear: true,
  backdropPath: true,
} satisfies Prisma.MovieSelect;

export type MediaBasicSelectType = Prisma.MovieGetPayload<{
  select: typeof mediaSelect;
}>;

export const genreSelect = {
  id: true,
  tmdbId: true,
  name: true,
  description: true,
  slug: true,
};

export const movieGenreSelect = {
  ...genreSelect,
  movies: {
    select: mediaSelect,
  },
} satisfies Prisma.MovieGenreSelect;

export type MovieGenreBasicSelectType = Prisma.MovieGenreGetPayload<{
  select: typeof movieGenreSelect;
}>;

export const serieGenreSelect = {
  ...genreSelect,
  series: {
    select: mediaSelect,
  },
} satisfies Prisma.SerieGenreSelect;

export type SerieGenreBasicSelectType = Prisma.SerieGenreGetPayload<{
  select: typeof serieGenreSelect;
}>;
