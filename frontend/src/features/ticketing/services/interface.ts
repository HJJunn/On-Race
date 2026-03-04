import { ApiResponse } from '@/types/api';

export interface ITicketingService {
  getTicketingInfo(): Promise<ApiResponse<any>>;
}
