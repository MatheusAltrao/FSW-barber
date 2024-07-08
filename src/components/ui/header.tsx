import { Menu } from 'lucide-react';
import Image from 'next/image';
import Logo from '../../assets/logos/main.svg';
import { Button } from './button';

const Header = () => {
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
