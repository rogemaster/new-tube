import { HydrateClient, trpc } from '@/trpc/server';
import { HomeView } from '@/modules/home/ui/views/home-view';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    categoryId?: string;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams;
  console.log(categoryId);

  void trpc.categories.getMany.prefetch();

  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  );
};

export default Page;
