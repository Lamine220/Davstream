import { Play } from 'lucide-react';
import Link from 'next/link';
import { SiDiscord, SiInstagram, SiTiktok, SiX } from 'react-icons/si';

import { Button } from '../ui/button';

const navLinks = [
  {
    label: 'Journal des modifications',
    href: '',
  },
  {
    label: 'À propos',
    href: '',
  },
  {
    label: 'Domaines',
    href: '',
  },
  {
    label: 'Faire un don',
    href: '',
  },
  {
    label: 'Politique de confidentialité',
    href: '',
  },
  {
    label: "Conditions d'utilisation",
    href: '',
  },
];

const Footer = () => {
  return (
    <footer className="mt-auto border-t">
      <div className="container flex flex-col items-start justify-between gap-4 py-8 md:flex-row md:items-center">
        <div className="flex max-w-md flex-col items-start gap-1.5">
          <Link
            href={'/'}
            className="flex items-center justify-center gap-1.5 text-xl font-bold"
          >
            <span>DavStream</span>
            <Play className="fill-primary stroke-primary" />
          </Link>
          <p className="text-xs">
            Ce site Web ne conserve aucun fichier sur son serveur. Au lieu de
            cela, il fournit uniquement des liens vers du contenu multimédia
            hébergé par des services tiers.
          </p>
        </div>

        <div className="flex flex-col items-start gap-0 text-sm">
          {navLinks.map(item => (
            <Button
              asChild
              key={item.label}
              variant={'link'}
              className="h-fit px-0"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="border-t">
        <div className="container flex flex-col gap-4 py-8">
          <p className="text-sm">
            &copy; 2024{' '}
            <Button asChild variant={'link'} className="h-fit px-0">
              <Link href={'/'}>davstream.vercel.app</Link>
            </Button>{' '}
            | Site Web réalisé par Lamine Diamoutene
          </p>

          <div className="flex gap-4 text-lg">
            <SiTiktok />
            <SiDiscord />
            <SiInstagram />
            <SiX />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
