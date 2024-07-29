'use client';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './button';
import { Input } from './input';

import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import Loading from './loading';

const formSchema = z.object({
  search: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .trim()
    .min(1, 'Campo obrigatório'),
});

interface SearchProps {
  defaultValues?: string;
}

const Search = ({ defaultValues }: SearchProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: defaultValues,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    startTransition(() => {
      return router.push(`/barbershops?search=${data.search}`);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start gap-4 "
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Vintage"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
        >
          {isPending ? <Loading /> : <SearchIcon size={20} />}
        </Button>
      </form>
    </Form>
  );
};

export default Search;
