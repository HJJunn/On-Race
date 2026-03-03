import { wrapMockResponse } from '@/utils/api';
import { ITicketingService } from './interface';

export const ticketingMock: ITicketingService = {
  getTicketingInfo: async () => wrapMockResponse({}),
};
