import React from 'react';
import Header from '../modules/components/home-header/header';
import Intro from '../modules/components/home-contents/intro/intro';
import Voice from '../modules/components/home-contents/voice/voice';
import ActivityRecord from '../modules/components/home-contents/activity/activity';
import Healthy from '../modules/components/home-contents/health/healthy';
import Location from '../modules/components/home-contents/location/location';
import Notification from '../modules/components/home-contents/notification/notification';

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <Intro />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* 음성 명령 관리 */}
        <Voice />

        {/* 활동 기록 */}
        <ActivityRecord />

        {/* 건강 데이터 */}
        <Healthy />
      </div>

      {/* 위치 히스토리 & 알림 시스템 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 위치 히스토리 */}
        <Location />

        {/* 알림 시스템 */}
        <Notification />
      </div>
    </main>
    </div>
  );
};

export default HomeLayout;