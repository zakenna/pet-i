import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import React from 'react';

const Intro = () => {
  return (
    <section className="text-center mb-8 lg:mb-12 px-2">
      <h2 className="text-2xl lg:text-4xl font-bold text-orange-800 mb-3 lg:mb-4">
        반려동물과 함께하는 스마트한 일상
      </h2>
      <p className="text-base lg:text-lg text-orange-600 mb-6 lg:mb-8 max-w-2xl mx-auto">
        실시간 모니터링부터 건강 관리까지, 우리 아이를 위한 모든 것
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 lg:gap-4">
        <Button size="lg" className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
          <Video className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
          실시간 모니터링
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="border-orange-200 text-orange-700 hover:bg-orange-50 w-full sm:w-auto"
        >
          서비스 알아보기
        </Button>
      </div>
    </section>
  );
};

export default Intro;