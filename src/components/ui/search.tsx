'use client';
import { SearchIcon } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

const Search = () => {
  return (
    <div className="flex items-center gap-4 ">
      <Input placeholder="Busque uma barbearia" />
      <Button
        variant={'default'}
        size={'icon'}
      >
        <SearchIcon size={20} />
      </Button>
    </div>
  );
};

export default Search;
