import { Star } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
};

const Rating = ({ size = 'md', ...props }: Props) => {
  const value = Math.floor((props.rating * 5) / 10);
  const numbers = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div
      className={cn(
        'flex gap-2',
        size === 'sm' && 'gap-1',
        size === 'md' && '',
        size === 'lg' && '',
      )}
    >
      {numbers.map(item => (
        <Star
          key={item}
          className={cn(
            item <= value && 'fill-primary',
            size === 'sm' && 'h-4 w-4',
            size === 'md' && '',
            size === 'lg' && '',
          )}
        />
      ))}
    </div>
  );
};

export default Rating;
