
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StandardJuryInstructionsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/legal-reference/jury-instructions-navigator');
  }, [router]);

  return null; // or a loading spinner
}
