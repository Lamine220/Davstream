'use server';
import prisma from '@/lib/prisma';

export const updatePlayers = async () => {
  for (let index = 0; index < 1000; index++) {
    const seriePlayers = await prisma.seriePlayer.findMany({
      where: {
        serieId: {
          isSet: false,
        },
      },
      select: {
        id: true,
        episode: {
          select: {
            serieId: true,
          },
        },
      },
      skip: index * 20,
      take: 20,
    });

    await Promise.all(
      seriePlayers.map(async player => {
        // if (player.serieId) return null;
        await prisma.seriePlayer.update({
          where: { id: player.id },
          data: {
            serie: {
              connect: {
                id: player.episode.serieId,
              },
            },
          },
        });
        console.log('Updated', player.id);
      }),
    );
  }
};
