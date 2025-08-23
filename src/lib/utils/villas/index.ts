import type {
  InfiniteVillaResponse,
  Villa,
  VillaApiResponse,
} from "@/lib/api/hooks/villas";

export const flattenInfiniteVillas = (
  data: InfiniteVillaResponse | undefined
): Villa[] => {
  if (!data?.pages) return [];
  return data.pages.flatMap((page: VillaApiResponse) => page.data || []);
};

export const getTotalVillaCount = (
  data: VillaApiResponse | InfiniteVillaResponse | undefined
): number => {
  if (!data) return 0;

  if ("data" in data && "pagination" in data) {
    return data.pagination?.total_count || 0;
  }

  if ("pages" in data && data.pages.length > 0) {
    return data.pages[0]?.pagination?.total_count || 0;
  }

  return 0;
};

export const getCurrentPage = (
  data: VillaApiResponse | InfiniteVillaResponse | undefined
): number => {
  if (!data) return 1;

  if ("data" in data && "pagination" in data) {
    return data.pagination?.page || 1;
  }

  if ("pages" in data && data.pages.length > 0) {
    const lastPage = data.pages[data.pages.length - 1];
    return lastPage?.pagination?.page || data.pages.length;
  }

  return 1;
};

export const getTotalPages = (
  data: VillaApiResponse | InfiniteVillaResponse | undefined
): number => {
  if (!data) return 1;

  // Handle regular VillaApiResponse
  if ("data" in data && "pagination" in data) {
    return data.pagination?.total_pages || 1;
  }

  // Handle InfiniteVillaResponse
  if ("pages" in data && data.pages.length > 0) {
    return data.pages[0]?.pagination?.total_pages || 1;
  }

  return 1;
};

export const hasMorePages = (
  data: VillaApiResponse | InfiniteVillaResponse | undefined
): boolean => {
  if (!data) return false;

  // Handle regular VillaApiResponse
  if ("data" in data && "pagination" in data) {
    return data.pagination?.has_more || false;
  }

  // Handle InfiniteVillaResponse
  if ("pages" in data && data.pages.length > 0) {
    const lastPage = data.pages[data.pages.length - 1];
    return lastPage?.pagination?.has_more || false;
  }

  return false;
};

// Type guard functions
export const isVillaApiResponse = (data: any): data is VillaApiResponse => {
  return data && "data" in data && "pagination" in data;
};

export const isInfiniteVillaResponse = (
  data: any
): data is InfiniteVillaResponse => {
  return data && "pages" in data && "pageParams" in data;
};
