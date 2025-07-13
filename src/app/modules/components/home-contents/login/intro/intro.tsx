import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import React from 'react';

const Intro = () => {
  return (
    <section className="text-center mb-12">
      <h2 className="text-4xl font-bold text-orange-800 mb-4">
        반려동물과 함께하는 스마트한 일상
      </h2>
      <p className="text-lg text-orange-600 mb-8">
        실시간 모니터링부터 건강 관리까지, 우리 아이를 위한 모든 것
      </p>
      <div className="flex justify-center space-x-4">
        <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
          <Video className="mr-2 h-5 w-5" />
          실시간 모니터링
        </Button>
        <Button size="lg" variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
          서비스 알아보기
        </Button>
      </div>
    </section>
  );
};

export default Intro;