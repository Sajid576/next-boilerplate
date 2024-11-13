/* eslint-disable react/no-unescaped-entities */
import { Button } from '@components/ui/button';
import { Satellite } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function UnderConstruction() {
    const router = useRouter()
  return (
    <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
      <Satellite size={72} />
      <h1 className="text-4xl font-bold leading-tight">Coming Soon 👀</h1>
      <p className="text-center text-muted-foreground">
        This page has not been created yet. <br />
        Stay tuned though!
      </p>
      <Button className='mt-6' onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
    </div>
    
  );
}
