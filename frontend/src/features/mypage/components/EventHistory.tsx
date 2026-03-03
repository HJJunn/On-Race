'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function EventHistory() {
  // 하이드레이션 오류 방지를 위한 마운트 상태 관리
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('entry');

  // 컴포넌트가 마운트된 후에만 렌더링을 허용
  useEffect(() => {
    setMounted(true);
  }, []);

  const getTabClass = (tabName: string) => {
    const isActive = activeTab === tabName;
    return `
      w-32 py-3 text-center text-sm  transition-all duration-200 relative
      ${isActive ? 'font-bold' : 'font-medium'}
    `;
  };

  // 아직 마운트되지 않았다면 껍데기(Skeleton) 혹은 null 반환
  if (!mounted) {
    return <div className="mb-6 min-h-[100px]" />; // 레이아웃 시프트를 방지하기 위해 최소 높이 설정
  }

  return (
    <div className="p-2 ">
      <div>
        <h2 className="text-2xl font-bold">이벤트 내역</h2>
      </div>
      <div className="w-full">
        {/* 탭 메뉴: 왼쪽 정렬 및 탭 간 간격 설정 */}
        <div className="flex border-b border-gray-200 mb-6">
          <Button
            variant="text"
            onClick={() => setActiveTab('entry')}
            className={cn(
              getTabClass('entry'),
              'flex-1 relative rounded-none py-4',
            )}
          >
            응모
            {/* 활성화 시 나타나는 언더바 */}
            {activeTab === 'entry' && (
              <div className="absolute bottom-0 w-full left-0 h-0.5 bg-black transition-all" />
            )}
          </Button>
          <Button
            variant="text"
            onClick={() => setActiveTab('wait')}
            className={cn(
              getTabClass('wait'),
              'flex-1 relative rounded-none py-4',
            )}
          >
            대기
            {/* 활성화 시 나타나는 언더바 */}
            {activeTab === 'wait' && (
              <div className="absolute bottom-0 w-full left-0 h-0.5 bg-black transition-all" />
            )}
          </Button>
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="p-2">
          {/* 응모 탭 */}
          {activeTab === 'entry' && (
            <div className="space-y-4">
              <section>
                <div>
                  <h2 className="text-xl font-bold mb-2 flex items-center">
                    응모 탭
                  </h2>
                </div>
              </section>
            </div>
          )}

          {/* 대기 탭 */}
          {activeTab === 'wait' && (
            <div className="space-y-6">
              <section>
                <div>
                  <h2 className="text-xl font-bold mb-2 flex items-center">
                    대기 탭
                  </h2>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
