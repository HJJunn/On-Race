/**
 * 코스 정보 인터페이스
 */
export interface Course {
  id: number;
  name: string;
  distanceM: number;
  price: number;
}

/**
 * 마라톤 이벤트 상세 인터페이스
 */
export interface MarathonEvent {
  id: number;
  title: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'UPCOMING'; // API 명세에 따른 상태값들
  type: 'LOTTERY' | 'FIRST_COME'; // 응모 방식
  thumbnailImg: string;
  eventAt: string; // ISO 8601
  appStartAt: string; // ISO 8601
  appEndAt: string; // ISO 8601
  venueAddress: string;
  courses: Course[];
}

/**
 * API의 'data' 필드에 들어갈 페이징 구조
 */
export interface MarathonList {
  content: MarathonEvent[];
  nextCursor: number | null;
  hasNext: boolean;
}
