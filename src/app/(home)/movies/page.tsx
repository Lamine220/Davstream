import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getPaginatedMovies } from '@/server/action/medias';

import InfiniteScroll from './_components/infinite-scroll';

const FilmsPage = async () => {
  const movies = await getPaginatedMovies();

  return (
    <main>
      <div className="container flex flex-col gap-4 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/movies">Films</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <InfiniteScroll
          data={movies}
          lastElementId={movies.at(-1)?.id}
          fetchAction={getPaginatedMovies}
        />
      </div>
    </main>
  );
};

export default FilmsPage;
