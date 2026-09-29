export interface ApiResponse<T = any> {
  message: string;
  data: T;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalData: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiError {
  message: string;
  errors?: {
    field: string;
    message: string;
    value?: string;
  }[];
}
