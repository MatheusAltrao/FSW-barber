'use client';
import { Menu } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Logo from '../../assets/logos/main.svg';
import { Button } from './button';

const Header = () => {
  const {} = useSession();

  const handleSignInClick = async () => {
    await signIn();
  };

  const handleSignOutClick = async () => {
    await signOut();
  };

  return (
    <div className="h-20 flex items-center border-b justify-between px-5">
      <Image
        width={100}
        height={20}
        alt="FSW Barber"
        src={Logo}
      />

      <Button
        variant={'outline'}
        size={'sm'}
      >
        {' '}
        <Menu size={20} />{' '}
      </Button>
    </div>
  );
};

export default Header;
