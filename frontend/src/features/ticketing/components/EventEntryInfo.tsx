'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getStatusLabel, getCategoryLabel } from '@/types/constants';
import { MarathonEvent } from '@/features/schedule/types';
import { Button } from '@/components/ui/button';
import { LuChevronLeft, LuShare } from 'react-icons/lu';
import {
  EntryInfo,
  EntryOptions,
  EntryNotice,
  EntryParticipationInfo,
} from './details/entry';

export function EventEntryInfo({
  event,
  setIsUserModalOpen,
}: {
  event: MarathonEvent;
  setIsUserModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // 하이드레이션 오류 방지를 위한 마운트 상태 관리
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [actionCard, setActionCard] = useState<Boolean>(false);

  // 상태 관리: 코스 및 페이스 선택
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedPace, setSelectedPace] = useState('');

  const getHeaderText = () => {
    if (event.status === 'UPCOMING') return '빠른 신청 준비하기';
    if (event.type === 'LOTTERY') return '응모하기';
    if (event.type === 'FIRST_COME') return '신청하기';
    return '신청하기';
  };

  const getButtonText = () => {
    if (event.status === 'UPCOMING') return '저장하기';
    return '다음 단계로';
  };

  // 컴포넌트가 마운트된 후에만 렌더링을 허용
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAction = () => {
    if (!selectedCourse) return alert('코스를 선택해주세요.');
    if (!selectedPace) return alert('목표 페이스를 선택해주세요.');

    if (event.status === 'UPCOMING') {
      alert('사전 정보가 저장되었습니다.');
    } else {
      setIsUserModalOpen(true);
    }
  };

  // 아직 마운트되지 않았다면 껍데기(Skeleton) 혹은 null 반환
  if (!mounted) {
    return <div className="mb-6 min-h-[100px]" />; // 레이아웃 시프트를 방지하기 위해 최소 높이 설정
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <div className="text-sm font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-sm">
          {getCategoryLabel(event.category)}
        </div>

        <div className="text-sm font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-sm">
          {getStatusLabel(event.status)}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold ">{event.title}</h1>
        <Button variant="ghost" size="icon">
          <LuShare />
        </Button>
      </div>

      {/* 정보 리스트 */}
      <EntryInfo event={event} />

      {/* 선택 옵션 및 버튼 */}
      <div className="mt-auto space-y-3">
        {actionCard && (
          <div className="p-4 space-y-4 border border-gray-200 rounded-sm">
            <div className="flex flex-row items-center">
              <Button
                variant="ghost"
                size="fit"
                onClick={() => setActionCard(false)}
              >
                <LuChevronLeft size={20} />
              </Button>
              <h2 className="text-lg font-bold text-gray-900">
                {getHeaderText()}
              </h2>
            </div>

            <EntryOptions
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              selectedPace={selectedPace}
              setSelectedPace={setSelectedPace}
            />

            {/* 참가 정보 */}
            <EntryParticipationInfo />

            {/* 안내사항 */}
            <EntryNotice />

            <Button
              variant="primary1"
              rounded="full"
              onClick={() => handleAction()}
            >
              {getButtonText()}
            </Button>
          </div>
        )}

        {!actionCard && (
          <div>
            <Button
              variant="primary1"
              rounded="full"
              onClick={() => setActionCard((prev) => !prev)}
            >
              {getHeaderText()}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
