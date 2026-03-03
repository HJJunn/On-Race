'use client';

import { useState, useEffect } from 'react'; // useEffect 추가
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DistanceSlider from './filter/DistanceSlider';
import DualDateRangePicker from './filter/DualDateRangePicker';
import { IoLocationOutline } from 'react-icons/io5';

export function ScheduleFilter() {
  // 1. 하이드레이션 오류 방지를 위한 마운트 상태 관리
  const [mounted, setMounted] = useState(false);

  const [range, setRange] = useState({ min: 0, max: 99 });
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  // 2. 컴포넌트가 마운트된 후에만 렌더링을 허용
  useEffect(() => {
    setMounted(true);
  }, []);

  const options = [
    { value: 'all', label: '전체' },
    { value: 'location1', label: '서울' },
    { value: 'location2', label: '경기' },
    { value: 'location3', label: '강원' },
    { value: 'location4', label: '충청' },
    { value: 'location5', label: '전라' },
    { value: 'location6', label: '경상' },
  ];

  // 3. 아직 마운트되지 않았다면 껍데기(Skeleton) 혹은 null 반환
  if (!mounted) {
    return <div className="mb-6 min-h-[100px]" />; // 레이아웃 시프트를 방지하기 위해 최소 높이 설정
  }

  return (
    <div className="mb-6">
      <div className="p-2 grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold">거리</label>
          <DistanceSlider
            min={0}
            max={100}
            step={5}
            onChange={(val: any) => setRange(val)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold">날짜</label>
          <DualDateRangePicker onChange={(val) => setDateRange(val)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold">지역</label>
          <Select>
            <SelectTrigger variant="default" className="justify-between">
              <div className="flex items-center text-left">
                <IoLocationOutline className="mr-2" />
                <SelectValue placeholder="지역을 선택하세요" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end items-center gap-2 p-2 w-full">
        <Button variant="outline" rounded="full" size="fit">
          초기화
        </Button>
        <Button variant="primary1" rounded="full" size="fit">
          검색하기
        </Button>
      </div>
    </div>
  );
}
