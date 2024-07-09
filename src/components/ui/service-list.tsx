import Image from 'next/image';
import EyeBrow from '../../assets/icons/eyebrow.svg';
import Hydration from '../../assets/icons/hydration.svg';
import Mustache from '../../assets/icons/mustache.svg';
import Razor from '../../assets/icons/razor.svg';
import Scissors from '../../assets/icons/scissors.svg';
import Towel from '../../assets/icons/towel.svg';
import { Button } from './button';

const ServiceList = () => {
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant={'ghost'}
        className="flex items-center justify-start gap-2"
      >
        <Image
          src={Scissors}
          alt=""
          width={20}
          height={20}
        />{' '}
        <span>Cabelo</span>
      </Button>

      <Button
        variant={'ghost'}
        className="flex items-center justify-start gap-2"
      >
        <Image
          src={Mustache}
          alt=""
          width={20}
          height={20}
        />{' '}
        <span>Barba</span>
      </Button>

      <Button
        variant={'ghost'}
        className="flex items-center justify-start gap-2"
      >
        <Image
          src={Razor}
          alt=""
          width={20}
          height={20}
        />{' '}
        <span>Acabamento</span>
      </Button>

      <Button
        variant={'ghost'}
        className="flex items-center justify-start gap-2"
      >
        <Image
          src={EyeBrow}
          alt=""
          width={20}
          height={20}
        />{' '}
        <span>Sombrancelha</span>
      </Button>

      <Button
        variant={'ghost'}
        className="flex items-center justify-start gap-2"
      >
        <Image
          src={Towel}
          alt=""
          width={20}
          height={20}
        />{' '}
        <span>Massagem</span>
      </Button>

      <Button
        variant={'ghost'}
        className="flex items-center justify-start gap-2"
      >
        <Image
          src={Hydration}
          alt=""
          width={20}
          height={20}
        />{' '}
        <span>Hidratação</span>
      </Button>
    </div>
  );
};

export default ServiceList;
