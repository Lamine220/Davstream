'use client';
import { MoviePlayer, SeriePlayer } from '@prisma/client';
import { Link2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from './ui/button';

const Player = ({
  players,
  downloadLinks,
}: {
  players: (MoviePlayer | SeriePlayer)[];
  downloadLinks: string[];
}) => {
  const [playerId, setPlayerId] = useState(players[0].id);

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-video overflow-hidden rounded-lg border">
        <iframe
          title="Lecteur"
          src={players.find(item => item.id === playerId)?.url}
          allowFullScreen
          className="h-full w-full"
        ></iframe>
      </div>

      <div className="flex flex-col items-start gap-4">
        <div className="flex w-full gap-4">
          <Select onValueChange={v => setPlayerId(v)} defaultValue={playerId}>
            <SelectTrigger className="flex-1 capitalize">
              <SelectValue placeholder="Lecteur" />
            </SelectTrigger>

            <SelectContent className="capitalize">
              {players.map((item, index) => (
                <SelectItem key={item.id} value={item.id}>
                  Lecteur {index + 1} - {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            disabled={downloadLinks.length < 0}
            variant={'accent'}
            asChild
          >
            <Link prefetch={false} href={downloadLinks?.[0] || '#'}>
              Telecharger
            </Link>
          </Button>
        </div>

        <div className="flex w-full items-center gap-4 rounded-lg border bg-muted/50 px-4 py-3 text-xs md:text-sm">
          Si la video ne fonctionne pas, essayez de changer de lecteur. On vous
          recommande Vidoza, Filemoon et Uqload.
        </div>
      </div>
    </div>
  );
};

export default Player;
