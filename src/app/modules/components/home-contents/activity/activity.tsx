import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Calendar } from 'lucide-react';
import React from 'react';

const ActivityRecord = () => {
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
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-700">오늘 걸음수</span>
            <span className="font-semibold text-orange-800">2,450보</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-700">활동 시간</span>
            <span className="font-semibold text-orange-800">3시간 15분</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-700">수면 시간</span>
            <span className="font-semibold text-orange-800">8시간 30분</span>
          </div>
        </div>
        <Button size="sm" variant="outline" className="w-full border-orange-200">
          <Calendar className="mr-2 h-4 w-4" />
          전체 기록 보기
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActivityRecord;