export interface Currency {
  id: number;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CurrencyListResponse {
  total_count: number;
  total_pages: number;
  page: number;
  size: number;
  has_more: boolean;
  list: Currency[];
}
