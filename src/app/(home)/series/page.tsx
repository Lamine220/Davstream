import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getPaginatedSeries } from '@/server/action/medias';

import InfiniteScroll from '../movies/_components/infinite-scroll';

const SeriesPage = async () => {
  const series = await getPaginatedSeries();

  return (
    <div className="container flex flex-col gap-4 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/series">Series</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <InfiniteScroll
        data={series}
        lastElementId={series.at(-1)?.id}
        fetchAction={getPaginatedSeries}
      />
    </div>
  );
};

export default SeriesPage;
