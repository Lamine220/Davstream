'use client';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { Button, ButtonProps } from '@/components/ui/button';

const SubmitButton = ({ children, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button {...props} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" /> Chargement
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};

export default SubmitButton;
