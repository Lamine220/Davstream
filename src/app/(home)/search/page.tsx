import MediaCard from '@/components/media-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchMedia } from '@/server/action/medias';

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

const SearchPage = async ({ searchParams }: Props) => {
  const { q } = await searchParams;
  const results = !Array.isArray(q) && q ? await searchMedia(q) : [];

  return (
    <main>
      <div className="container flex flex-col gap-4 py-4">
        <form action="#" className="flex gap-4">
          <Input
            name="q"
            placeholder="Nom du film ou de la serie"
            required
            min={1}
          />
          <Button variant={'accent'}>Rechercher</Button>
        </form>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
            {results.length > 0 ? (
              results.map((item, index) => (
                <MediaCard key={`${item.id}-${index}`} data={item} />
              ))
            ) : (
              <p>Aucun Resultat</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
