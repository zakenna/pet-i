import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import React from 'react';

const Notification = () => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-orange-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-orange-800">
          <Bell className="mr-2 h-5 w-5" />
          알림 시스템
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-green-800">정상 활동</p>
              <p className="text-xs text-green-600">모든 지표가 정상입니다</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-yellow-800">식사 시간</p>
              <p className="text-xs text-yellow-600">30분 후 저녁 식사</p>
            </div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-blue-800">산책 시간</p>
              <p className="text-xs text-blue-600">1시간 후 산책 예정</p>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Notification;