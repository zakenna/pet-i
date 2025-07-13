import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield } from 'lucide-react';
import React from 'react';

const Healthy = () => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-orange-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-orange-800">
          <Heart className="mr-2 h-5 w-5" />
          건강 데이터
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-700">체온</span>
            <span className="font-semibold text-green-600">38.2°C</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-700">심박수</span>
            <span className="font-semibold text-green-600">85 BPM</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-orange-700">상태</span>
            <Badge className="bg-green-100 text-green-800">정상</Badge>
          </div>
        </div>
        <Button size="sm" variant="outline" className="w-full border-orange-200">
          <Shield className="mr-2 h-4 w-4" />
          건강 리포트
        </Button>
      </CardContent>
    </Card>
  );
};

export default Healthy;