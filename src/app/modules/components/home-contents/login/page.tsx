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
        {/* SidebarProvider는 최상위에 한 번만 - 이제 활성화 */}
        <SidebarProvider>
          <div className="flex">
            {/* 사이드바 */}
            <SidebarLayout />
            
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
        </SidebarProvider>
      </SignedIn>
  );
};

export default LoginPage;