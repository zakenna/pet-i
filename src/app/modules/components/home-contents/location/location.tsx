import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import React from 'react';

const Location = () => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-orange-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-orange-800">
          <MapPin className="mr-2 h-5 w-5" />
          위치 히스토리
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-orange-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-orange-700 mb-2">현재 위치</p>
          <p className="font-semibold text-orange-800">집 - 거실</p>
          <p className="text-xs text-orange-600 mt-1">마지막 업데이트: 5분 전</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-orange-700">오늘 이동 거리</span>
            <span className="font-semibold">1.2km</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-orange-700">방문한 장소</span>
            <span className="font-semibold">3곳</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Location;