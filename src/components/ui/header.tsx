'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Calendar, Home, LogOut, Menu } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../assets/logos/main.svg';
import ActiveLink from './active-link';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import Divider from './divider';
import ServiceList from './service-list';

const Header = () => {
  const { data, status } = useSession();

  const handleSignInClick = async () => {
    await signIn('google');
  };

  const handleSignOutClick = async () => {
    await signOut();
  };

  return (
    <div className="h-20 flex items-center border-b justify-between px-5">
      <Link href={'/'}>
        <Image
          width={100}
          height={20}
          alt="FSW Barber"
          src={Logo}
        />
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={'outline'}
            size={'sm'}
          >
            <Menu size={20} />{' '}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          {status == 'authenticated' && (
            <div className=" mt-8">
              <div className="flex items-center gap-2">
                <Avatar className="h-[44px] w-[44px]">
                  <AvatarImage
                    className={'rounded-full'}
                    src={data?.user?.image!}
                  />
                  <AvatarFallback>{data?.user?.name}</AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="font-bold">{data?.user?.name}</h2>
                  <p className="text-sm text-gray-400">{data?.user?.email}</p>
                </div>
              </div>
            </div>
          )}

          {status == 'unauthenticated' && (
            <div>
              <SheetDescription>
                Você ainda não fez login, entre com o Google para liberar as novas funcionalidades.
              </SheetDescription>

              <Button
                onClick={handleSignInClick}
                className=" mt-8 w-full"
              >
                Entrar com Google
              </Button>
            </div>
          )}

          {status == 'authenticated' && (
            <div>
              <Divider />

              <div className="flex flex-col gap-2">
                <ActiveLink
                  href="/"
                  icon={<Home size={20} />}
                  name="Início"
                />

                <ActiveLink
                  href="/bookings"
                  icon={<Calendar size={20} />}
                  name="Agendamentos"
                />
              </div>
            </div>
          )}

          {status == 'authenticated' && (
            <div>
              <Divider />

              <ServiceList />

              <Divider />

              <Button
                onClick={handleSignOutClick}
                className="w-full gap-2 justify-start "
                variant={'destructive'}
              >
                {' '}
                <LogOut size={20} /> <span> Sair da conta</span>
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
