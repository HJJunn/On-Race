import { ApiResponse } from '@/types/api';

export const wrapMockResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  code: 'SUCCESS',
  message: 'Mock data success',
  data: data,
  timestamp: new Date().toString(),
});
