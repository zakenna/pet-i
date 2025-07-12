import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Save, Volume2 } from 'lucide-react';
import React from 'react';

const Voice = () => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-orange-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-orange-800">
          <Mic className="mr-2 h-5 w-5" />
          음성 명령 관리
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-orange-700 mb-3">저장된 명령어</p>
          <div className="space-y-2">
            <Badge variant="secondary" className="mr-2">앉아</Badge>
            <Badge variant="secondary" className="mr-2">기다려</Badge>
            <Badge variant="secondary" className="mr-2">이리와</Badge>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
            <Volume2 className="mr-2 h-4 w-4" />
            녹음
          </Button>
          <Button size="sm" variant="outline" className="border-orange-200">
            <Save className="mr-2 h-4 w-4" />
            저장
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Voice;