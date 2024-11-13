import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function Logo() {
  return (
    <Link href="/" className="flex-1 flex justify-center">
      <Image className='dark:hidden' src="/logo.svg" alt="logo" width={80} height={40} />
      <Image className='hidden dark:block' src="/logo-dark.svg" alt="logo" width={80} height={40} />
    </Link>
  );
}
