'use client';

import { useEffect, useState } from 'react';

export function AccountSettings() {
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
    <div>
      <div className="space-y-4">
        <div className="border-2 border-gray-200">
          <div>
            <h2 className="text-xl">회원정보</h2>
          </div>
        </div>
      </div>
      <div className="border-2 border-gray-200">
        <div>
          <h2 className="text-xl">비밀번호 변경</h2>
        </div>
      </div>
      <div className="border-2 border-gray-200">
        <div>
          <h2 className="text-xl">배송지 정보</h2>
        </div>
      </div>
      <div className="border-2 border-gray-200">
        <div>
          <h2 className="text-xl">마케팅 및 광고 알림 설정</h2>
        </div>
      </div>
    </div>
  );
}
