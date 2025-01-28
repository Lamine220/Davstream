'use client';
import { Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { Skeleton } from '../ui/skeleton';

const MediaCardSkeleton = () => {
  return (
    <Card className="group relative flex cursor-pointer flex-col overflow-hidden rounded-md border-2 bg-muted/25">
      <Badge variant={'accent'} className="absolute right-2 top-2 z-10">
        ????
      </Badge>

      <figure className="aspect-[3/4.5] w-full overflow-hidden border-b-2">
        <Skeleton className="h-full w-full rounded-none" />
      </figure>

      <div className="flex flex-col gap-2 p-2.5">
        <div className="flex items-center justify-between">
          <Badge>????</Badge>

          <Badge variant={'outline'}>
            <Star className="mr-2 size-3 fill-primary" />
            ??.??
          </Badge>
        </div>

        <Skeleton className="h-3.5 w-full bg-primary/25" />
      </div>
    </Card>
  );
};

export default MediaCardSkeleton;
