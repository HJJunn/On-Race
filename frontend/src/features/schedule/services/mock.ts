import { MARATHON_LIST } from '@/mockups';
import { wrapMockResponse } from '@/utils/api';
import { IScheduleService } from './interface';

export const scheduleMock: IScheduleService = {
  getSchedules: async () => wrapMockResponse(MARATHON_LIST),
};
