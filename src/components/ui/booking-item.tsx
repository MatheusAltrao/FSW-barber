import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Badge } from './badge';
import { Card, CardContent } from './card';

const BookingItem = () => {
  return (
    <Card>
      <CardContent className="grid p-0 grid-cols-4">
        <div className="col-span-3 p-3 border-r ">
          <div>
            <Badge>Confirmado</Badge>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold ">Corte de Cabelo</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  className={'rounded-full'}
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <p className="text-sm">Vintage Barber</p>
            </div>
          </div>
        </div>

        <div className="col-span-1 p-5 flex flex-col items-center justify-center gap-1 ">
          <p className="capitalize text-sm ">Fevereiro</p>
          <p className="capitalize text-2xl">06</p>
          <p className="capitalize text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
