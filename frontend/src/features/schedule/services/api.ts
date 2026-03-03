import axios from 'axios';
import { ApiResponse } from '@/types/api';
import { MarathonList } from '../types';
import { IScheduleService } from './interface';

// Next.js API Route를 호출하기 위한 인스턴스
const apiClient = axios.create({
  // 상대 경로를 사용하면 브라우저에서는 현재 도메인(localhost:3000 등)을 자동으로 사용합니다.
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const scheduleApi: IScheduleService = {
  getSchedules: async () => {
    // 내부 API Route인 /api/marathons 에 요청을 보냅니다.
    const response = await apiClient.get<ApiResponse<MarathonList>>('/events');
    return response.data;
  },
};
