// Add these to your types file (or create a new one)
export interface VillaQueryParams {
  curs_exchanges_id?: number;
  lat?: string;
  lng?: string;
  zoom?: number;
  page?: number;
  length?: number;
  sort_by?: string;
  sort_type?: "asc" | "desc";
  search_param?: string;
  status?: "draft" | "post";
  limit?: number;
  area_id?: number;
  location_id?: number;
  sub_location_id?: number;
  start_date?: string;
  end_date?: string;
  bathroom?: number;
  user_id?: number;
  villa_bvp?: string;
  slug?: string;
  whatsapp?: string;
  email?: string;
  type_accommodation?: "house" | "guesthouse" | "hotel" | "apartment" | "villa";
  freehold?: "yes" | "no";
  leasehold?: "yes" | "no";
  monthly_rental?: "yes" | "no";
  yearly_rental?: "yes" | "no";
  retreats_villa?: { params: string[] };
  mountain_villa?: { params: string[] };
  wedding_villa?: { params: Record<string, any> | string[] };
  beach_villa?: { params: string[] };
  family_villa?: { params: string[] };
  close_clubs?: boolean;
  facilities?: string[];
  price_min?: number;
  price_max?: number;
  bedroom?: number;
  code?: string;
  is_paginate?: boolean;
}

export interface Villa {
  id: number;
  code: string | null;
  area: string | null;
  location: string | null;
  sub_location: string | null;
  type_of_accommodation:
    | "house"
    | "guesthouse"
    | "hotel"
    | "apartment"
    | "villa";
  total_bedroom: number | null;
  total_bathroom: number | null;
  base_rate: number | null;
  base_rate_currency: string | null;
  latitude: string | null;
  longitude: string | null;
  wedding_villa: {
    standing_guests: number | null;
    seated_guests: number | null;
  } | null;
  albums: Array<{
    image_url: string | null;
  }>;
  villa_bvp: string | null;
}

export interface VillaPagination {
  total_count: number;
  total_pages: number;
  page: number;
  size: number;
  has_more: boolean;
}

export interface VillaApiResponse {
  success: boolean;
  data: Villa[];
  message: string;
  pagination: VillaPagination | null;
}

export interface InfiniteVillaResponse {
  pages: VillaApiResponse[];
  pageParams: number[];
}
