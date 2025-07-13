import { SidebarProvider } from '@/components/ui/sidebar';
import { SignedIn } from '@clerk/nextjs';
import React from 'react';
import SidebarLayout from '../../home-sidebar/sidebar';
import Header from '../../home-header/header';
import Voice from '../voice/voice';
import Intro from './intro/intro';
import Healthy from './health/healthy';
import ActivityRecord from './activity/activity';
import Location from './location/location';
import Notification from './notification/notification';

const LoginPage = () => {
  return (
    <SignedIn>
      <SidebarProvider>
        <div className="relative min-h-screen w-full">
          {/* 사이드바 - 오버레이 방식 */}
          <div className="fixed left-0 top-0 h-full z-50">
            <SidebarLayout />
          </div>
          <Header />
          {/* 메인 콘텐츠 - 사이드바 공간 확보 후 고정 */}
          <div className="ml-64 mr-64 min-h-screen flex flex-col">
            {/* 헤더 - 고정 위치 */}

            {/* 메인 콘텐츠 - 고정 크기 */}
            <main className="flex-1 w-full pl-4 pr-0 py-8">
              {/* Hero Section */}
              <div className="w-full pr-4 mb-8">
                <Intro />
              </div>

              {/* Main Dashboard Grid - 고정 크기 */}
              <div className="w-full pr-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Voice />
                <ActivityRecord />
                <Healthy />
              </div>

              {/* 위치 히스토리 & 알림 시스템 - 고정 크기 */}
              <div className="w-full pr-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
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