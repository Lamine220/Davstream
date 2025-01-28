'use client';
import { Movie } from '@prisma/client';
import Autoplay from 'embla-carousel-autoplay';
import _ from 'lodash';
import { Play } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { MediaBasicSelectType } from '@/server/db/utils/document-select-fields';

interface HeroProps {
  media: MediaBasicSelectType[];
  autoplayDelay?: number;
}

const HeroSection: React.FC<HeroProps> = ({ media, autoplayDelay = 4000 }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      opts={{ loop: true }}
      setApi={setApi}
      plugins={[Autoplay({ delay: autoplayDelay })]}
      className="relative w-full"
    >
      <CarouselContent>
        {media.map(item => (
          <HeroSlide key={item.id} media={item} />
        ))}
      </CarouselContent>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {Array.from({ length: count }, (_, index) => index).map(item => (
          <Button
            onClick={() => api?.scrollTo(item)}
            key={item}
            className={cn(
              'size-2 rounded-full bg-secondary',
              current === item + 1 && 'bg-primary',
            )}
          ></Button>
        ))}
      </div>
    </Carousel>
  );
};

const HeroSlide = ({ media }: { media: MediaBasicSelectType }) => (
  <CarouselItem>
    <div
      style={{
        backgroundImage: `url(${media.backdropPath})`,
      }}
      className="relative flex h-[70vh] items-end justify-center bg-muted bg-cover bg-center"
    >
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-t from-background via-background/30 to-transparent" />

      <div className="container relative z-30 mb-16 flex h-fit max-w-lg flex-col items-center justify-center gap-5 text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <Rating rating={media.rating} />
          <h1 className="pointer-events-none text-balance text-3xl font-bold md:text-5xl">
            {media.title ?? 'Spider-man: Across the Spider-Verse'}
          </h1>
        </div>

        <Button asChild>
          <Link
            prefetch={false}
            href={`/movies/${_.kebabCase(media.title)}/${media.id}`}
          >
            <span>Regarder</span>
            <Play className="ml-2 h-5 w-5 fill-background stroke-background" />
          </Link>
        </Button>
      </div>
    </div>
  </CarouselItem>
);

export default HeroSection;
