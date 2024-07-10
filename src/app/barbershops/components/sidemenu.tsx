'use client';
import ActiveLink from '@/components/ui/active-link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
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

const Sidemenu = () => {
  const { data, status } = useSession();

  const handleSignInClick = async () => {
    await signIn('google');
  };

  const handleSignOutClick = async () => {
    await signOut();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={'icon'}
          variant={'outline'}
          className=" absolute top-4 right-4 z-10"
        >
          <Menu size={20} />
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
              <p>
                Você ainda não fez login, entre com o Google para liberar as novas funcionalidades.
              </p>
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
  );
};

export default Sidemenu;
