import { SidebarProvider } from '@/components/ui/sidebar';
import { SignedIn } from '@clerk/nextjs';
import React from 'react';
import SidebarLayout from '../../home-sidebar/sidebar';
import Header from '../../home-header/header';
import Voice from './voice/voice';
import Intro from './intro/intro';
import Healthy from './health/healthy';
import ActivityRecord from './activity/activity';
import Location from './location/location';
import Notification from './notification/notification';

const LoginPage = () => {
  return (
    <SignedIn>
      <SidebarProvider>
        <div className="min-h-screen w-full flex flex-col">
          {/* 헤더 - 전체 상단에 배치 */}
          <Header />

          {/* 헤더 아래 사이드바와 메인 컨텐츠 영역 */}
          <div className="flex flex-1">
            {/* 사이드바 - 헤더 아래 왼쪽에 배치 */}
            <div className="flex-shrink-0">
              <SidebarLayout />
            </div>

            {/* 메인 컨텐츠 영역 - 사이드바 옆에 배치 */}
            <main className="flex-1 p-4 lg:p-8 overflow-x-hidden min-w-0">
              {/* Hero Section */}
              <div className="mb-6 lg:mb-8">
                <Intro />
              </div>

              {/* Main Dashboard Grid - 반응형 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <Voice />
                <ActivityRecord />
                <Healthy />
              </div>

              {/* 위치 히스토리 & 알림 시스템 - 반응형 그리드 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <Location />
                <Notification />
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SignedIn>
  );
};

export default LoginPage;