import { Prisma } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';

type Props = {
  media:
    | Prisma.MovieGetPayload<{
        include: {
          genres: true;
          watchProviders: true;
          players: true;
        };
      }>
    | Prisma.SerieGetPayload<{
        include: {
          genres: true;
          episodes: true;
          seasons: true;
          watchProviders: true;
        };
      }>;
};

const DetailsSection = ({ media }: Props) => {
  return (
    <div
      className="relative z-0 grid grid-cols-1 items-start gap-4 border-y px-0 py-4 md:grid-cols-[250px_1fr] md:px-4"
      style={{
        backgroundImage: `url(${media.backdropPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-tr from-background via-background/95 to-transparent"></div>

      <figure className="mx-auto aspect-[3/4.5] w-full max-w-xs overflow-hidden rounded-md">
        <Image
          src={media.posterPath || '/default-poster.jpg'}
          unoptimized
          className="h-full w-full object-cover object-center"
          width={500}
          height={500}
          alt={media.title}
          title={media.title}
        />
      </figure>

      <div className="flex flex-col gap-2">
        <div>
          <h3 className="text-4xl font-bold">{media.title}</h3>
          <p className="text-xl">{media.originalTitle}</p>
        </div>

        <span>{media.releaseYear}</span>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Synopsis</h3>
          <p className="text-sm">{media.overview}</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-semibold">Titre d&apos;origine</h3>
            <p>{media.originalTitle}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {media.genres.map(item => (
              <Link
                prefetch={false}
                href={`/${media.mediaType === 'SERIE' ? 'series' : 'movies'}/genres/${item.id}`}
                key={item.id}
              >
                <Badge>{item.name}</Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
