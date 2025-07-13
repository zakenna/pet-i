import React from 'react';
import { SignedIn } from '@clerk/nextjs';
import { SidebarProvider } from "@/components/ui/sidebar";
import LogoutPage from '../modules/components/home-contents/logout/page';
import Intro from '../modules/components/home-contents/login/intro/intro';
import Voice from '../modules/components/home-contents/voice/voice';
import ActivityRecord from '../modules/components/home-contents/login/activity/activity';
import Healthy from '../modules/components/home-contents/login/health/healthy';
import Location from '../modules/components/home-contents/login/location/location';
import Notification from '../modules/components/home-contents/login/notification/notification';
import Header from '../modules/components/home-header/header';
import SidebarLayout from '../modules/components/home-sidebar/sidebar';


// ... 기타 컴포넌트 imports

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* 로그아웃 페이지 */}
      <LogoutPage />

      {/* 로그인 페이지 */}
      <SignedIn>
        {/* SidebarProvider는 최상위에 한 번만 */}

          <div className="flex">
            {/* 사이드바 */}
            
            {/* 메인 콘텐츠 */}
            <div className="flex-1">
              <Header />
              
              <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <Intro />

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <Voice />
                  <ActivityRecord />
                  <Healthy />
                </div>

                {/* 위치 히스토리 & 알림 시스템 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Location />
                  <Notification />
                </div>
              </main>
            </div>
          </div>
      </SignedIn>
    </div>
  );
};

export default HomeLayout;