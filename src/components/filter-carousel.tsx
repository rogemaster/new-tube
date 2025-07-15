'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FilterCarouselProps {
  value?: string | null;
  isLoading?: boolean;
  onSelect?: (value: string | null) => void;
  data: {
    value: string;
    label: string;
  }[];
}

export const FilterCarousel = ({ data, value, isLoading, onSelect }: FilterCarouselProps) => {
  return (
    <div className="relative w-full">
      {/* 왼쪽 페이드 */}
      <div
        className={cn(
          'absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none',
          false && 'hidden',
        )}
      />

      <Carousel opts={{ align: 'start', dragFree: true }} className="w-full px-12">
        <CarouselContent className="-ml-3">
          <CarouselItem className="pl-3 basis-auto">
            <Badge
              variant={value === null ? 'default' : 'secondary'}
              className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
            >
              All
            </Badge>
          </CarouselItem>
          {!isLoading &&
            data.map((item) => (
              <CarouselItem key={item.value} className="pl-3 basis-auto">
                <Badge
                  variant={value === item.value ? 'default' : 'secondary'}
                  className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
                >
                  {item.label}
                </Badge>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 z-20" />
        <CarouselNext className="right-0 z-20" />
      </Carousel>

      {/* 오른쪽 페이드 */}
      <div
        className={cn(
          'absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none',
          false && 'hidden',
        )}
      />
    </div>
  );
};
