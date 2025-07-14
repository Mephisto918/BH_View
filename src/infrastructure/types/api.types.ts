export interface ApiResponseType<T> {
  success: boolean;
  results: T;
  timestamp: string;
}