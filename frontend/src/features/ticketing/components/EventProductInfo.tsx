'use client';

import { useEffect, useState } from 'react';

import {
  EventCourse,
  EventDetails,
  EventBaseInfo,
  EventParticipationInfo,
  EventNotice,
} from './details/product';

export function EventProductInfo() {
  // 하이드레이션 오류 방지를 위한 마운트 상태 관리
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트된 후에만 렌더링을 허용
  useEffect(() => {
    setMounted(true);
  }, []);

  // 아직 마운트되지 않았다면 껍데기(Skeleton) 혹은 null 반환
  if (!mounted) {
    return <div className="mb-6 min-h-[100px]" />; // 레이아웃 시프트를 방지하기 위해 최소 높이 설정
  }

  return (
    <div className="space-y-4">
      {/* 코스 정보 섹션 */}
      <EventCourse />

      {/* 구분선 */}
      <div className="my-3 h-[1px] bg-gray-300"></div>

      {/* 상세 설명 섹션 */}
      <EventDetails />

      {/* 구분선 */}
      <div className="my-3 h-[1px] bg-gray-300"></div>

      {/* 기본정보 섹션 */}
      <EventBaseInfo />

      {/* 구분선 */}
      <div className="my-3 h-[1px] bg-gray-300"></div>

      {/* 참가/구성 정보 섹션 */}
      <EventParticipationInfo />

      {/* 구분선 */}
      <div className="my-3 h-[1px] bg-gray-300"></div>

      {/* 공지사항 섹션 */}
      <EventNotice />
    </div>
  );
}
