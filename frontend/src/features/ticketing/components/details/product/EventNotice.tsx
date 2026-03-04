'use client';

import { useEffect, useState } from 'react';

export function EventNotice() {
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
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center">공지사항</h2>
        <div className="w-full p-2 overflow-hidden bg-gray-100 border-2 rounded">
          <p>안전 수칙</p>
          <p>건강 책임 고지</p>
          <p>사고 발생 시 책임 범위</p>
          <p>보험 적용 여부</p>
          <p>건강 상태 자가 판단 책임</p>
          <p>안전 중심 행사 안내</p>
        </div>
      </div>
    </section>
  );
}
