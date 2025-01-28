'use client';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import MediaCard from '@/components/media-card';
import {
  MediaBasicSelectType,
  MovieGenreBasicSelectType,
  SerieGenreBasicSelectType,
} from '@/server/db/utils/document-select-fields';

type Props = {
  lastElementId?: string;
  data: MediaBasicSelectType[];
  genreId: string;
  fetchAction: (data: {
    genreId: string;
    lastElementId?: string;
  }) => Promise<MovieGenreBasicSelectType>;
};

const GenreInfiniteScroll = (props: Props) => {
  const [data, setData] = useState<MediaBasicSelectType[]>(props.data);
  const [lastElementId, setLastElementId] = useState(props.lastElementId);

  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({
    rootMargin: '500px 0px',
  });

  useEffect(() => {
    const fetcher = async () => {
      try {
        setIsLoading(true);
        const data = await props.fetchAction({
          genreId: props.genreId,
          lastElementId: lastElementId,
        });

        setData(previous => [...previous, ...data.movies]);
        setLastElementId(data.movies.at(-1)?.id);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (inView && !isLoading) fetcher();
  }, [inView, lastElementId, isLoading, props]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {data.map((item, index) => (
          <MediaCard key={`${item.id}-${index}`} data={item} />
        ))}
      </div>

      <div ref={ref} className="flex items-center justify-center p-4">
        <Loader2 className="size-12 animate-spin" />
      </div>
    </>
  );
};

export default GenreInfiniteScroll;
