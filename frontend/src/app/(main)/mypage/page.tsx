'use client';

import { Button } from '@/components/ui/button';
import {
  EventHistory,
  OrderHistory,
  AccountSettings,
} from '@/features/mypage/components';
import { useState } from 'react';

export default function MyPage() {
  // 현재 활성화된 메뉴 상태 (기본값: 'events')
  const [activeTab, setActiveTab] = useState('events');

  const menuItems = [
    { id: 'events', label: '이벤트 내역' },
    { id: 'orders', label: '주문 내역' },
    { id: 'account', label: '계정 관리' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventHistory />;
      case 'orders':
        return <OrderHistory />;
      case 'account':
        return <AccountSettings />;
      default:
        return <EventHistory />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-4 flex flex-row gap-8 min-h-screen">
      {/* 왼쪽 사이드바 메뉴 */}
      <aside className="w-full md:w-64 flex flex-col p-4 gap-4 border rounded-sm h-fit">
        <div>
          <h2 className="text-xl font-bold">마이페이지</h2>
        </div>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-left px-6 py-4 rounded-sm transition-all ${
                activeTab === item.id
                  ? 'bg-gray-200 text-black'
                  : 'bg-white text-black border-2 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* 오른쪽 콘텐츠 영역 */}
      <section className="flex-1  border rounded-sm p-8 bg-white">
        {renderContent()}
      </section>
    </div>
  );
}
