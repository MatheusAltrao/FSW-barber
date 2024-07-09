'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ReactNode } from 'react';

interface ActiveLinkProps {
  href: string;
  name: string;
  icon: ReactNode;
}

const ActiveLink = ({ href, name, icon }: ActiveLinkProps) => {
  const pathname = usePathname();
  const activeLink = pathname.startsWith(href);

  return (
    <Link href={href}>
      <div
        className={`hover:opacity-80 rounded-md transition-opacity px-4 h-11 flex items-center gap-3 ${
          activeLink ? 'bg-primary' : 'bg-transparent'
        }`}
      >
        {icon} <span>{name}</span>
      </div>
    </Link>
  );
};
export default ActiveLink;
