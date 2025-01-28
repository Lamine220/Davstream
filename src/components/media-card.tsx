'use client';
import _ from 'lodash';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { MediaBasicSelectType } from '@/server/db/utils/document-select-fields';

type Props = {
  data: Media;
  providerLogo?: string;
};
type Media = MediaBasicSelectType;

const MediaCard = ({ data, providerLogo }: Props) => {
  const isSerie = data.mediaType === 'SERIE';

  return (
    <Link
      href={
        isSerie
          ? `/series/${_.kebabCase(data.title)}/${data.id}`
          : `/movies/${_.kebabCase(data.title)}/${data.id}`
      }
    >
      <Card className="group relative flex cursor-pointer flex-col overflow-hidden rounded-md border bg-muted/25">
        <Badge variant={'accent'} className="absolute right-2 top-2 z-10">
          {isSerie ? 'Serie' : 'Film'}
        </Badge>

        {providerLogo && (
          <Image
            unoptimized
            loading="lazy"
            src={providerLogo}
            className="absolute left-2 top-2 z-10 size-8 object-contain"
            width={32}
            height={32}
            alt={'Provider logo'}
          />
        )}

        <figure className="aspect-[3/4.5] w-full overflow-hidden border-b">
          <Image
            unoptimized
            src={data.posterPath || '/default-poster.jpg'}
            className="h-full w-full object-cover object-center transition-all group-hover:scale-110"
            width={500}
            height={500}
            alt={data.title}
            title={data.originalTitle}
          />
        </figure>

        <div className="flex flex-col gap-1.5 p-2.5">
          <div className="flex items-center justify-between">
            <Badge>{data.releaseYear}</Badge>
            <Badge variant={'outline'}>
              <Star className="mr-2 size-3 fill-accent stroke-accent" />
              {data.rating.toFixed(2)}
            </Badge>
          </div>

          <p className="line-clamp-1 text-xs font-medium uppercase">
            {data.title}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default MediaCard;
