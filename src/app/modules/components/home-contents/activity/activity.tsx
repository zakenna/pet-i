'use client' // 클라이언트 컴포넌트로 변환

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Calendar, RefreshCw } from 'lucide-react';
import React, { useState, useEffect } from 'react';

// 활동 데이터 타입 정의
interface ActivityData {
  steps: number;
  activeTime: string;
  sleepTime: string;
  lastUpdated: string;
}

// 랜덤 데이터 생성 함수
const generateRandomActivityData = (): ActivityData => {
  const steps = Math.floor(Math.random() * 8000) + 1000; // 1000-9000 사이
  const activeHours = Math.floor(Math.random() * 6) + 1; // 1-6시간
  const activeMinutes = Math.floor(Math.random() * 60); // 0-59분
  const sleepHours = Math.floor(Math.random() * 3) + 7; // 7-9시간
  const sleepMinutes = Math.floor(Math.random() * 60); // 0-59분
  
  return {
    steps,
    activeTime: `${activeHours}시간 ${activeMinutes}분`,
    sleepTime: `${sleepHours}시간 ${sleepMinutes}분`,
    lastUpdated: new Date().toLocaleTimeString('ko-KR')
  };
};

const ActivityRecord = () => {
  // 상태 관리
  const [activityData, setActivityData] = useState<ActivityData>({
    steps: 0,
    activeTime: '0시간 0분',
    sleepTime: '0시간 0분',
    lastUpdated: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 초기 데이터 로딩
  useEffect(() => {
    const loadInitialData = async () => {
      // 실제 API 호출을 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActivityData(generateRandomActivityData());
      setIsLoading(false);
    };

    loadInitialData();
  }, []);

  // 5초마다 자동 업데이트 (실시간 시뮬레이션)
  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setActivityData(prev => ({
        ...prev,
        steps: prev.steps + Math.floor(Math.random() * 10), // 걸음수 증가
        lastUpdated: new Date().toLocaleTimeString('ko-KR')
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoading]);

  // 수동 새로고침
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 800));
    setActivityData(generateRandomActivityData());
    setIsRefreshing(false);
  };

  // 로딩 상태 UI
  if (isLoading) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-orange-100 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-orange-800">
            <Activity className="mr-2 h-5 w-5" />
            활동 기록
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 bg-orange-100 rounded animate-pulse w-20"></div>
                <div className="h-4 bg-orange-100 rounded animate-pulse w-16"></div>
              </div>
            ))}
          </div>
          <div className="h-9 bg-orange-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-orange-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-orange-800">
          <div className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            활동 기록
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-8 w-8 p-0 hover:bg-orange-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-700">오늘 걸음수</span>
            <span className="font-semibold text-orange-800">
              {activityData.steps.toLocaleString()}보
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-700">활동 시간</span>
            <span className="font-semibold text-orange-800">{activityData.activeTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-700">수면 시간</span>
            <span className="font-semibold text-orange-800">{activityData.sleepTime}</span>
          </div>
        </div>
        
        {/* 마지막 업데이트 시간 표시 */}
        <div className="text-xs text-orange-500 text-center">
          마지막 업데이트: {activityData.lastUpdated}
        </div>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full border-orange-200"
          onClick={() => alert('전체 기록 페이지로 이동합니다!')}
        >
          <Calendar className="mr-2 h-4 w-4" />
          전체 기록 보기
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActivityRecord;