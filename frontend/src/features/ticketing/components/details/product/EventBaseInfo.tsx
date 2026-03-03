'use client';

import { useEffect, useState } from 'react';

export function EventBaseInfo() {
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
    <section>
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">기본정보</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 border-1 border-gray-300 border-b border-gray-200 text-sm md:text-base">
        {/* 행 1-1 */}
        <div className="bg-gray-100 px-4 py-4 font-semibold text-gray-600 border-b border-gray-200">
          이벤트명
        </div>
        <div className="px-4 py-4 text-gray-900 border-b border-gray-200 md:border-r border-gray-200 font-medium">
          서울 마라톤 대회 2026
        </div>
        {/* 행 1-2 */}
        <div className="bg-gray-100 px-4 py-4 font-semibold text-gray-600 border-b border-gray-200">
          이벤트장소
        </div>
        <div className="px-4 py-4 text-gray-900 border-b border-gray-200">
          서울 올림픽공원
        </div>

        {/* 행 2-1 */}
        <div className="bg-gray-100 px-4 py-4 font-semibold text-gray-600 md:border-b-0 border-b border-gray-200">
          접수기간
        </div>
        <div className="px-4 py-4 md:border-r md:border-b-0 border-b border-gray-200">
          2026.01.26 ~ 2026.01.26
        </div>
        {/* 행 2-2 */}
        <div className="bg-gray-100 px-4 py-4 font-semibold text-gray-600">
          개최날짜
        </div>
        <div className="px-4 py-4 text-gray-900">2026.04.26</div>
      </div>
    </section>
  );
}
