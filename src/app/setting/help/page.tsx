'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Heart, 
  Mic, 
  Activity, 
  MapPin, 
  Bell,
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Smartphone,
  Monitor,
  Tablet,
  Shield,
  Database,
  Wifi
} from 'lucide-react';
import Link from 'next/link';

// 간단한 헤더 컴포넌트 (사이드바 의존성 제거)
const SimpleHeader = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" className="border-orange-200">
              <ArrowLeft className="mr-2 h-4 w-4" />
              홈으로 돌아가기
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-orange-800">Pet-I™ 도움말</h1>
          <div className="w-32"></div> {/* 공간 맞춤용 */}
        </div>
      </div>
    </div>
  );
};

// FAQ 데이터
const faqData = [
  {
    category: '시작하기',
    questions: [
      {
        question: 'Pet-I™란 무엇인가요?',
        answer: 'Pet-I™는 반려동물의 건강, 활동, 위치 등을 종합적으로 관리할 수 있는 스마트 케어 시스템입니다. 실시간 모니터링부터 건강 기록 관리까지 반려동물과 함께하는 모든 순간을 더욱 안전하고 행복하게 만들어드립니다.'
      },
      {
        question: '회원가입은 어떻게 하나요?',
        answer: '홈페이지 상단의 "회원가입" 버튼을 클릭하거나, 로그인 화면에서 "계정이 없으신가요?" 링크를 클릭하세요. 이메일과 비밀번호만 있으면 간단하게 가입할 수 있습니다. 회원가입 완료 후 바로 반려동물 등록 페이지로 이동합니다.'
      },
      {
        question: '반려동물 등록은 필수인가요?',
        answer: '회원가입 직후 반려동물 등록을 권장하지만, "건너뛰기" 버튼을 통해 나중에 등록할 수도 있습니다. 사이드바의 "반려동물 등록" 메뉴에서 언제든지 추가할 수 있습니다.'
      },
      {
        question: '여러 마리의 반려동물을 등록할 수 있나요?',
        answer: '네, 가능합니다! 한 계정에 여러 마리의 반려동물을 등록하고 각각 개별적으로 관리할 수 있습니다. 사이드바의 "반려동물 등록" 메뉴에서 추가로 등록하세요.'
      }
    ]
  },
  {
    category: '주요 기능',
    questions: [
      {
        question: '음성 명령 기능은 어떻게 사용하나요?',
        answer: '음성 명령 기능을 통해 반려동물의 훈련 명령어를 녹음하고 저장할 수 있습니다. "앉아", "기다려", "이리와" 등의 명령어를 녹음하여 일관된 훈련에 활용하세요. 저장된 명령어는 언제든지 재생할 수 있습니다.'
      },
      {
        question: '활동 기록은 어떻게 추적되나요?',
        answer: '반려동물의 일일 걸음수, 활동 시간, 수면 시간, 소모 칼로리 등이 자동으로 기록됩니다. 실시간으로 업데이트되며, 주간/월간 통계로 건강 상태를 한눈에 확인할 수 있습니다.'
      },
      {
        question: '건강 데이터는 어떤 정보가 포함되나요?',
        answer: '체온, 심박수, 체중, 혈압 등의 기본 건강 지표부터 증상 기록, 복용 약물, 수의사 소견까지 종합적으로 관리됩니다. 정기 검진 일정도 알림으로 받을 수 있습니다.'
      },
      {
        question: '위치 추적 기능은 어떻게 작동하나요?',
        answer: 'GPS를 통해 반려동물의 실시간 위치를 확인할 수 있으며, 이동 경로와 방문 장소도 기록됩니다. 안전 구역 설정 시 벗어나면 즉시 알림을 받을 수 있습니다.'
      },
      {
        question: '알림 시스템은 어떤 알림을 받을 수 있나요?',
        answer: '식사 시간, 산책 시간, 투약 일정, 건강 이상 징후, 예방접종 일정 등 다양한 알림을 받을 수 있습니다. 알림 설정은 개인 맞춤형으로 조정 가능합니다.'
      }
    ]
  },
  {
    category: '계정 관리',
    questions: [
      {
        question: '비밀번호를 잊어버렸어요.',
        answer: '로그인 페이지에서 "비밀번호를 잊으셨나요?" 링크를 클릭하세요. 등록된 이메일 주소로 비밀번호 재설정 링크가 발송됩니다.'
      },
      {
        question: '프로필 정보는 어떻게 수정하나요?',
        answer: '로그인 후 우상단의 프로필 아이콘을 클릭하거나, 사이드바의 "프로필" 메뉴에서 개인 정보를 수정할 수 있습니다. 이름, 이메일, 프로필 사진 등을 변경할 수 있습니다.'
      },
      {
        question: '반려동물 정보를 수정하고 싶어요.',
        answer: '사이드바의 "반려동물 관리" 메뉴에서 등록된 반려동물의 정보를 수정할 수 있습니다. 이름, 나이, 체중, 건강 상태 등 모든 정보를 업데이트할 수 있습니다.'
      },
      {
        question: '계정을 삭제하고 싶어요.',
        answer: '계정 삭제는 "설정 > 계정 관리 > 계정 삭제"에서 가능합니다. 삭제 시 모든 데이터가 영구적으로 삭제되므로 신중히 결정해주세요.'
      }
    ]
  },
  {
    category: '기술 지원',
    questions: [
      {
        question: '어떤 기기에서 사용할 수 있나요?',
        answer: 'Pet-I™는 웹 브라우저, 모바일 앱, 태블릿에서 모두 사용 가능합니다. Chrome, Safari, Firefox, Edge 등 주요 브라우저를 지원하며, iOS와 Android 앱도 제공됩니다.'
      },
      {
        question: '데이터는 안전하게 보관되나요?',
        answer: '네, 모든 데이터는 암호화되어 안전하게 보관됩니다. 개인정보보호법을 준수하며, 사용자의 동의 없이는 제3자와 정보를 공유하지 않습니다.'
      },
      {
        question: '오프라인에서도 사용할 수 있나요?',
        answer: '기본 기능은 온라인 연결이 필요하지만, 일부 데이터는 오프라인에서도 조회 가능합니다. 온라인 연결 시 자동으로 동기화됩니다.'
      },
      {
        question: '앱이 느리거나 오류가 발생해요.',
        answer: '브라우저 캐시를 지우거나 앱을 재시작해보세요. 문제가 지속되면 고객지원팀에 문의해주시기 바랍니다. 기기 사양과 오류 메시지를 함께 알려주시면 더 빠른 해결이 가능합니다.'
      }
    ]
  }
];

// 기능 설명 데이터
const features = [
  {
    icon: Heart,
    title: '건강 관리',
    description: '반려동물의 체온, 심박수, 체중 등을 실시간으로 모니터링',
    benefits: [
      '실시간 건강 상태 확인',
      '이상 징후 즉시 알림',
      '수의사와 데이터 공유',
      '건강 기록 자동 저장'
    ]
  },
  {
    icon: Activity,
    title: '활동 추적',
    description: '일일 걸음수, 활동량, 수면 패턴을 자동으로 기록',
    benefits: [
      '운동량 목표 설정',
      '활동 패턴 분석',
      '칼로리 소모량 계산',
      '수면 질 모니터링'
    ]
  },
  {
    icon: MapPin,
    title: '위치 추적',
    description: 'GPS를 통한 실시간 위치 확인 및 안전 구역 설정',
    benefits: [
      '실시간 위치 확인',
      '이동 경로 추적',
      '안전 구역 이탈 알림',
      '분실 방지 기능'
    ]
  },
  {
    icon: Mic,
    title: '음성 명령',
    description: '훈련 명령어 녹음 및 재생으로 일관된 훈련 지원',
    benefits: [
      '맞춤형 명령어 저장',
      '훈련 일관성 향상',
      '명령어 히스토리 관리',
      '가족 구성원 공유'
    ]
  },
  {
    icon: Bell,
    title: '스마트 알림',
    description: '식사, 산책, 약물 투여 등 중요한 일정을 놓치지 않도록 알림',
    benefits: [
      '맞춤형 알림 설정',
      '반복 일정 관리',
      '응급 상황 알림',
      '건강 검진 리마인더'
    ]
  },
  {
    icon: Database,
    title: '데이터 분석',
    description: '수집된 데이터를 바탕으로 건강 트렌드와 패턴 분석',
    benefits: [
      '건강 트렌드 분석',
      '행동 패턴 인사이트',
      '예측 건강 관리',
      '수의사 리포트 생성'
    ]
  }
];

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('시작하기');
  const [isClient, setIsClient] = useState(false);

  // 클라이언트 사이드에서만 실행되도록 보장
  useEffect(() => {
    setIsClient(true);
  }, []);

  // FAQ 검색 필터링
  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFAQ = (questionId: string) => {
    setExpandedFAQ(expandedFAQ === questionId ? null : questionId);
  };

  // 클라이언트 렌더링이 완료되기 전에는 간단한 로딩 표시
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <SimpleHeader />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-orange-600">도움말을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* 헤더 */}
      <SimpleHeader />

      <div className="container mx-auto px-4 py-8">
        {/* 소개 섹션 */}
        <section className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-orange-800 mb-4">
              Pet-I™와 함께하는 스마트한 반려동물 케어
            </h2>
            <p className="text-lg text-orange-600 mb-6">
              반려동물의 건강과 행복을 위한 종합 관리 시스템입니다. 
              실시간 모니터링부터 건강 기록까지, 우리 아이를 위한 모든 것을 제공합니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 text-orange-700">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>24/7 실시간 모니터링</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-700">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>AI 기반 건강 분석</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-700">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>수의사 협진 시스템</span>
              </div>
            </div>
          </div>
        </section>

        {/* 빠른 시작 가이드 */}
        <section className="mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-orange-100 p-8">
            <h3 className="text-2xl font-bold text-orange-800 mb-6 text-center">
              🚀 빠른 시작 가이드
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h4 className="font-semibold text-orange-800 mb-2">회원가입</h4>
                <p className="text-sm text-orange-600">
                  이메일과 비밀번호로 간편하게 계정을 만드세요
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h4 className="font-semibold text-orange-800 mb-2">반려동물 등록</h4>
                <p className="text-sm text-orange-600">
                  우리 아이의 기본 정보를 입력해주세요
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h4 className="font-semibold text-orange-800 mb-2">기기 연결</h4>
                <p className="text-sm text-orange-600">
                  스마트 디바이스를 연결하여 모니터링을 시작하세요
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h4 className="font-semibold text-orange-800 mb-2">케어 시작</h4>
                <p className="text-sm text-orange-600">
                  실시간 데이터를 확인하고 건강을 관리하세요
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 주요 기능 소개 */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-orange-800 mb-8 text-center">
            🎯 주요 기능 소개
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-orange-100 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-orange-800">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-orange-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ 섹션 */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-orange-800 mb-8 text-center">
            ❓ 자주 묻는 질문
          </h3>
          
          {/* 검색 바 */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400" />
              <Input
                placeholder="궁금한 내용을 검색해보세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-orange-200 focus:border-orange-400"
              />
            </div>
          </div>

          {/* 카테고리 탭 */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {faqData.map((category) => (
              <Button
                key={category.category}
                variant={activeCategory === category.category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.category)}
                className={activeCategory === category.category 
                  ? "bg-orange-500 hover:bg-orange-600" 
                  : "border-orange-200 text-orange-700 hover:bg-orange-50"
                }
              >
                {category.category}
              </Button>
            ))}
          </div>

          {/* FAQ 목록 */}
          <div className="max-w-4xl mx-auto">
            {(searchTerm ? filteredFAQ : faqData.filter(cat => cat.category === activeCategory)).map((category) => (
              <div key={category.category} className="mb-6">
                {searchTerm && (
                  <h4 className="text-lg font-semibold text-orange-800 mb-4">{category.category}</h4>
                )}
                <div className="space-y-3">
                  {category.questions.map((faq, index) => {
                    const questionId = `${category.category}-${index}`;
                    const isExpanded = expandedFAQ === questionId;
                    
                    return (
                      <Card key={questionId} className="bg-white/80 backdrop-blur-sm border-orange-100">
                        <CardHeader 
                          className="cursor-pointer hover:bg-orange-50 transition-colors"
                          onClick={() => toggleFAQ(questionId)}
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-orange-800">{faq.question}</h5>
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-orange-600" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-orange-600" />
                            )}
                          </div>
                        </CardHeader>
                        {isExpanded && (
                          <CardContent>
                            <p className="text-orange-700 leading-relaxed">{faq.answer}</p>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {searchTerm && filteredFAQ.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="h-16 w-16 text-orange-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-orange-600 mb-2">검색 결과가 없습니다</h4>
                <p className="text-orange-500">다른 키워드로 검색해보시거나 고객지원팀에 문의해주세요.</p>
              </div>
            )}
          </div>
        </section>

        {/* 시스템 요구사항 */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-orange-800 mb-8 text-center">
            💻 시스템 요구사항
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Monitor className="h-8 w-8 text-orange-600" />
                  <CardTitle className="text-orange-800">웹 브라우저</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Chrome 90+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Safari 14+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Firefox 88+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Edge 90+</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-8 w-8 text-orange-600" />
                  <CardTitle className="text-orange-800">모바일 앱</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">iOS 13+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Android 8+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">인터넷 연결 필요</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">위치 서비스 권한</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Tablet className="h-8 w-8 text-orange-600" />
                  <CardTitle className="text-orange-800">태블릿</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">iPad OS 13+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Android Tablet 8+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Windows Tablet</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">반응형 웹 지원</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 고객지원 */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-orange-800 mb-8 text-center">
            🆘 고객지원
          </h3>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-orange-100 p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-orange-800 mb-2">실시간 채팅</h4>
                <p className="text-sm text-orange-600 mb-4">
                  월-금 09:00-18:00<br />
                  평균 응답시간: 5분 이내
                </p>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  채팅 시작하기
                </Button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-orange-800 mb-2">이메일 지원</h4>
                <p className="text-sm text-orange-600 mb-4">
                  pet-i@gmail.com<br />
                  평균 응답시간: 24시간 이내
                </p>
                <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                  이메일 보내기
                </Button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-orange-800 mb-2">전화 지원</h4>
                <p className="text-sm text-orange-600 mb-4">
                  1588-0000<br />
                  월-금 09:00-18:00
                </p>
                <Button size="sm" variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                  전화 걸기
                </Button>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-orange-100">
              <div className="flex items-center justify-center space-x-6 text-sm text-orange-600">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>평일 09:00-18:00 운영</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>응급상황 시 24시간 지원</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 업데이트 및 공지사항 */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-orange-800 mb-8 text-center">
            📢 최신 업데이트
          </h3>
          <div className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-orange-800">v1.0.0 업데이트</h4>
                      <span className="text-sm text-orange-500">2025.01.15</span>
                    </div>
                    <p className="text-orange-600 text-sm mb-2">
                      새로운 AI 건강 분석 기능과 향상된 알림 시스템을 추가했습니다.
                    </p>
                    <ul className="text-xs text-orange-500 space-y-1">
                      <li>• AI 기반 행동 패턴 분석 추가</li>
                      <li>• 맞춤형 건강 리포트 기능</li>
                      <li>• 모바일 앱 성능 개선</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* 푸터 */}
      <footer className="bg-orange-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-4">Pet-I™과 함께하는 행복한 반려생활</h3>
          <p className="text-orange-200 mb-4">
            언제나 우리 아이를 위한 최고의 케어를 제공하겠습니다.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-orange-200 hover:text-white transition-colors">이용약관</a>
            <a href="#" className="text-orange-200 hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="text-orange-200 hover:text-white transition-colors">서비스 문의</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpPage;