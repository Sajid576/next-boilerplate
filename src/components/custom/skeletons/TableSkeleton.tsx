import { Skeleton } from '@components/ui/skeleton';
import React from 'react'

export default function TableSkeleton() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <Skeleton className="h-8 w-[250px]" />
        <div className='flex gap-3'>
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-8 w-[200px]" />
        </div>
      </div>
      <Skeleton className="h-[425px] w-full" />
    </div>
  );
}
