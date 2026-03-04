import { ApiResponse } from '@/types/api';
import { MarathonList } from '../types';

export interface IScheduleService {
  getSchedules(): Promise<ApiResponse<MarathonList>>;
}
