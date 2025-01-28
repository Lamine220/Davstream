'use client';
import { WatchProvider } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '../ui/skeleton';

const WatchProvidersCarousel = ({ data }: { data: WatchProvider[] }) => {
  return (
    <Carousel opts={{ dragFree: true, align: 'start' }} className="w-full">
      <section className="group mb-4 flex flex-col items-start gap-4 md:flex-row md:items-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 470 315"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden shrink-0 fill-primary transition-transform group-hover:rotate-12 md:flex md:size-12"
        >
          <path
            d="M308 56L16.0779 57.4217C7.21102 57.4649 0 50.2889 0 41.4219V16.052C0 7.19518 7.19515 0.0233608 16.0519 0.0521167L308 1C393.605 1 470 71.3958 470 157C470 242.604 393.605 315 308 315H243C234.164 315 227 307.837 227 299V274C227 265.163 234.164 258 243 258H308C363.781 258 409 212.781 409 157C409 101.219 363.781 56 308 56Z"
            className="fill-inherit"
          />
          <path
            d="M196 153C196 139.745 185.255 129 172 129H16C7.16344 129 0 136.163 0 145V171C0 179.837 7.16344 187 16 187H121C129.837 187 137 194.163 137 203V299C137 307.837 144.163 315 153 315H180C188.837 315 196 307.837 196 299V153Z"
            className="fill-inherit"
          />
        </svg>

        <div>
          <div className="flex items-center justify-start gap-2 transition-transform group-hover:translate-x-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 470 315"
              xmlns="http://www.w3.org/2000/svg"
              className="flex size-7 shrink-0 fill-primary transition-transform group-hover:rotate-12 md:hidden"
            >
              <path
                d="M308 56L16.0779 57.4217C7.21102 57.4649 0 50.2889 0 41.4219V16.052C0 7.19518 7.19515 0.0233608 16.0519 0.0521167L308 1C393.605 1 470 71.3958 470 157C470 242.604 393.605 315 308 315H243C234.164 315 227 307.837 227 299V274C227 265.163 234.164 258 243 258H308C363.781 258 409 212.781 409 157C409 101.219 363.781 56 308 56Z"
                className="fill-inherit"
              />
              <path
                d="M196 153C196 139.745 185.255 129 172 129H16C7.16344 129 0 136.163 0 145V171C0 179.837 7.16344 187 16 187H121C129.837 187 137 194.163 137 203V299C137 307.837 144.163 315 153 315H180C188.837 315 196 307.837 196 299V153Z"
                className="fill-inherit"
              />
            </svg>

            <h3 className="text-sm font-semibold uppercase md:text-lg">
              Plateformes
            </h3>
          </div>

          <p className="max-w-md text-xs">
            Retrouvez tous les Films et Séries de vos plateformes de streaming
            favorites, gratuitement en francais et sans inscription.
          </p>
        </div>

        <div className="ml-auto hidden space-x-2 self-end md:flex">
          <CarouselPrevious
            variant={'accent'}
            className="static min-h-max w-16 translate-y-0 rounded-lg"
          />

          <CarouselNext
            variant={'accent'}
            className="static min-h-max w-16 translate-y-0 rounded-lg"
          />
        </div>
      </section>

      <CarouselContent className="-ml-2">
        {data.map(item => (
          <CarouselItem
            key={item.name}
            className="basis-1/2 pl-2 md:basis-1/4 lg:basis-1/6"
          >
            <Link prefetch={false} href={`/watchProviders/${item.tmdbId}`}>
              <Card className="flex h-[100px] w-full items-center justify-center bg-foreground p-4 text-background md:h-[110px] lg:h-[125px]">
                <Image
                  unoptimized
                  alt={item.name}
                  title={item.name}
                  src={item.logoPath}
                  width={Number.MAX_SAFE_INTEGER}
                  height={Number.MAX_SAFE_INTEGER}
                  className="w-32 object-cover object-center"
                />
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-4 flex w-full gap-2 md:hidden">
        <CarouselPrevious
          variant={'accent'}
          className="static min-h-max flex-1 translate-y-0 rounded-lg"
        />

        <CarouselNext
          variant={'accent'}
          className="static min-h-max flex-1 translate-y-0 rounded-lg"
        />
      </div>
    </Carousel>
  );
};

export default WatchProvidersCarousel;

export const WatchProvidersCarouselSkeleton = () => {
  const number_ = Array.from({ length: 6 }, (_, index) => index + 1);
  return (
    <Carousel opts={{ dragFree: true, align: 'start' }} className="w-full">
      <section className="group mb-4 flex flex-col items-start gap-4 md:flex-row md:items-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 470 315"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden shrink-0 fill-primary transition-transform group-hover:rotate-12 md:flex md:size-12"
        >
          <path
            d="M308 56L16.0779 57.4217C7.21102 57.4649 0 50.2889 0 41.4219V16.052C0 7.19518 7.19515 0.0233608 16.0519 0.0521167L308 1C393.605 1 470 71.3958 470 157C470 242.604 393.605 315 308 315H243C234.164 315 227 307.837 227 299V274C227 265.163 234.164 258 243 258H308C363.781 258 409 212.781 409 157C409 101.219 363.781 56 308 56Z"
            className="fill-inherit"
          />
          <path
            d="M196 153C196 139.745 185.255 129 172 129H16C7.16344 129 0 136.163 0 145V171C0 179.837 7.16344 187 16 187H121C129.837 187 137 194.163 137 203V299C137 307.837 144.163 315 153 315H180C188.837 315 196 307.837 196 299V153Z"
            className="fill-inherit"
          />
        </svg>

        <div>
          <div className="flex items-center justify-start gap-2 transition-transform group-hover:translate-x-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 470 315"
              xmlns="http://www.w3.org/2000/svg"
              className="flex size-7 shrink-0 fill-primary transition-transform group-hover:rotate-12 md:hidden"
            >
              <path
                d="M308 56L16.0779 57.4217C7.21102 57.4649 0 50.2889 0 41.4219V16.052C0 7.19518 7.19515 0.0233608 16.0519 0.0521167L308 1C393.605 1 470 71.3958 470 157C470 242.604 393.605 315 308 315H243C234.164 315 227 307.837 227 299V274C227 265.163 234.164 258 243 258H308C363.781 258 409 212.781 409 157C409 101.219 363.781 56 308 56Z"
                className="fill-inherit"
              />
              <path
                d="M196 153C196 139.745 185.255 129 172 129H16C7.16344 129 0 136.163 0 145V171C0 179.837 7.16344 187 16 187H121C129.837 187 137 194.163 137 203V299C137 307.837 144.163 315 153 315H180C188.837 315 196 307.837 196 299V153Z"
                className="fill-inherit"
              />
            </svg>

            <h3 className="text-sm font-semibold uppercase md:text-lg">
              Plateformes
            </h3>
          </div>

          <p className="max-w-md text-xs">
            Retrouvez tous les Films et Séries de vos plateformes de streaming
            favorites, gratuitement en francais et sans inscription.
          </p>
        </div>

        <div className="ml-auto hidden space-x-2 self-end md:flex">
          <CarouselPrevious
            variant={'accent'}
            className="static min-h-max w-16 translate-y-0 rounded-lg"
          />

          <CarouselNext
            variant={'accent'}
            className="static min-h-max w-16 translate-y-0 rounded-lg"
          />
        </div>
      </section>

      <CarouselContent className="-ml-2">
        {number_.map(item => (
          <CarouselItem
            key={item}
            className="basis-1/2 pl-2 md:basis-1/4 lg:basis-1/6"
          >
            <Skeleton className="h-[100px] min-h-max min-w-max rounded-md md:h-[110px] lg:h-[125px]" />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-4 flex w-full gap-2 md:hidden">
        <CarouselPrevious
          variant={'accent'}
          className="static min-h-max flex-1 translate-y-0 rounded-lg"
        />

        <CarouselNext
          variant={'accent'}
          className="static min-h-max flex-1 translate-y-0 rounded-lg"
        />
      </div>
    </Carousel>
  );
};
