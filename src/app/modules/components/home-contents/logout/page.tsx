'use client';

import { SignedOut } from '@clerk/nextjs';
import React from 'react';
import Header from '../../home-header/header';

const LogoutPage = () => {
  return (
    <SignedOut>
      <Header />
      <div className="min-h-screen">
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInDelayed {
            0%, 30% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes scaleIn {
            0%, 60% {
              opacity: 0;
              transform: scale(0.8);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes pulseGentle {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
          }
          
          @keyframes bounceGentle {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out;
          }
          
          .animate-fade-in-delayed {
            animation: fadeInDelayed 1.5s ease-out;
          }
          
          .animate-scale-in {
            animation: scaleIn 1.8s ease-out;
          }
          
          .animate-pulse-slow {
            animation: pulseGentle 2s infinite;
          }
          
          .animate-bounce-gentle {
            animation: bounceGentle 2s infinite;
          }
        `}</style>

        {/* 히어로 섹션 */}
        <section className="py-20 px-4 relative overflow-hidden">
          {/* 배경 애니메이션 요소들 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-orange-300 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
            <div className="absolute bottom-20 left-20 w-12 h-12 bg-orange-400 rounded-full opacity-25 animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>
            <div className="absolute bottom-32 right-10 w-14 h-14 bg-orange-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '4.5s'}}></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* 메인 제목 - 페이드인 + 슬라이드업 */}
            <h1 className="text-5xl font-bold text-orange-800 mb-6 animate-fade-in-up">
              반려동물 케어 시스템
            </h1>
            
            {/* 서브 제목 - 지연된 페이드인 */}
            <p className="text-xl text-orange-600 mb-8 max-w-2xl mx-auto animate-fade-in-delayed">
              사랑하는 반려동물의 건강과 행복을 위한 종합 관리 플랫폼입니다
            </p>

            {/* 중앙 애니메이션 요소 */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center animate-pulse-slow shadow-lg">
                  <span className="text-3xl animate-bounce-gentle">🐾</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-300 rounded-full animate-ping opacity-75"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-500 rounded-full animate-ping opacity-50" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
            
            {/* 버튼들 - 스케일 애니메이션 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <button className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                로그인하기
              </button>
              <button className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-50 hover:scale-105 transition-all duration-300 font-semibold">
                회원가입
              </button>
            </div>
          </div>
        </section>

        {/* 주요 기능 섹션 */}
        <section className="py-16 px-4 bg-orange-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-orange-800 text-center mb-12">
              주요 기능
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="text-xl font-semibold text-orange-800 mb-3">
                  건강 관리
                </h3>
                <p className="text-orange-600">
                  예방접종, 건강검진, 투약 일정을 체계적으로 관리하세요
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold text-orange-800 mb-3">
                  일정 관리
                </h3>
                <p className="text-orange-600">
                  산책, 미용, 병원 방문 등 모든 일정을 한 곳에서 관리하세요
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-orange-800 mb-3">
                  성장 기록
                </h3>
                <p className="text-orange-600">
                  몸무게, 키, 사진 등 반려동물의 성장 과정을 기록하세요
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 시작하기 섹션 */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-800 mb-6">
              지금 시작하세요
            </h2>
            <p className="text-orange-600 mb-8">
              로그인하여 반려동물 케어 시스템의 모든 기능을 이용해보세요
            </p>
            <div className="bg-orange-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">
                🎉 무료로 시작하기
              </h3>
              <p className="text-orange-600 mb-6">
                회원가입 후 즉시 모든 기능을 사용할 수 있습니다
              </p>
              <button className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                로그인하여 시작하기
              </button>
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="bg-orange-800 text-white py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">반려동물 케어 시스템</h3>
            <p className="text-orange-200">
              소중한 반려동물과 함께하는 건강하고 행복한 삶을 응원합니다
            </p>
          </div>
        </footer>
      </div>
    </SignedOut>
  );
};

export default LogoutPage;