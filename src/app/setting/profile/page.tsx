'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, CalendarDays, Scale, MapPin, User, Edit, Trash2, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

// 펫 데이터 타입
interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string | null;
  gender: string | null;
  birthDate: string | null;
  weight: string | null;
  color: string | null;
  microchipId: string | null;
  profileImage: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 펫 타입 한글 변환
const getPetTypeLabel = (type: string) => {
  const typeMap: { [key: string]: string } = {
    'dog': '🐕 강아지',
    'cat': '🐱 고양이',
    'bird': '🐦 새',
    'rabbit': '🐰 토끼',
    'hamster': '🐹 햄스터',
    'fish': '🐠 물고기',
    'reptile': '🦎 파충류',
    'other': '🐾 기타'
  };
  return typeMap[type] || type;
};

// 성별 한글 변환
const getGenderLabel = (gender: string | null) => {
  if (gender === 'male') return '♂️ 수컷';
  if (gender === 'female') return '♀️ 암컷';
  if (gender === 'unknown') return '❓ 모름';
  return null;
};

// 나이 계산 함수
const calculateAge = (birthDate: string | null) => {
  if (!birthDate) return '나이 미상';
  const today = new Date();
  const birth = new Date(birthDate);
  const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + 
                     (today.getMonth() - birth.getMonth());
  
  if (ageInMonths < 12) {
    return `${ageInMonths}개월`;
  }
  return `${Math.floor(ageInMonths / 12)}살`;
};

// 체중 포맷 함수
const formatWeight = (weight: string | null) => {
  if (!weight) return null;
  return `${parseFloat(weight)}kg`;
};

// 펫 카드 컴포넌트
const PetCard: React.FC<{ pet: Pet; onEdit?: (pet: Pet) => void; onDelete?: (petId: string) => void }> = ({ 
  pet, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-orange-800">{pet.name}</CardTitle>
          <div className="flex items-center space-x-2">
            {!pet.isActive && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">비활성</Badge>
            )}
            <div className="flex space-x-1">
              {onEdit && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(pet)}
                  className="h-8 w-8 p-0 hover:bg-orange-50"
                >
                  <Edit className="h-4 w-4 text-orange-600" />
                </Button>
              )}
              {onDelete && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(pet.id)}
                  className="h-8 w-8 p-0 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 프로필 이미지 */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-orange-50 border-4 border-orange-200">
            {pet.profileImage ? (
              <img
                src={pet.profileImage}
                alt={`${pet.name}의 프로필`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-orange-300">
                <Heart size={40} />
              </div>
            )}
          </div>
        </div>

        {/* 기본 정보 */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <Badge className="bg-orange-100 text-orange-700 border-orange-200">
              {getPetTypeLabel(pet.type)}
            </Badge>
            {pet.breed && (
              <Badge variant="outline" className="border-orange-200 text-orange-700">
                {pet.breed}
              </Badge>
            )}
            {pet.gender && (
              <Badge 
                variant="outline" 
                className={
                  pet.gender === 'male' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                  pet.gender === 'female' ? 'bg-pink-50 text-pink-700 border-pink-200' : 
                  'bg-gray-50 text-gray-700 border-gray-200'
                }
              >
                {getGenderLabel(pet.gender)}
              </Badge>
            )}
          </div>

          {pet.color && (
            <div className="flex items-center justify-center gap-2 text-sm text-orange-600">
              <div 
                className="w-4 h-4 rounded-full border border-orange-300"
                style={{ backgroundColor: pet.color.toLowerCase() }}
              />
              <span>{pet.color}</span>
            </div>
          )}
        </div>

        {/* 상세 정보 */}
        <div className="space-y-3 text-sm">
          {pet.birthDate && (
            <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 text-orange-700">
                <CalendarDays size={16} />
                <span>나이</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-orange-800">{calculateAge(pet.birthDate)}</div>
                <div className="text-xs text-orange-500">
                  {new Date(pet.birthDate).toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>
          )}

          {pet.weight && (
            <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 text-orange-700">
                <Scale size={16} />
                <span>체중</span>
              </div>
              <div className="font-semibold text-orange-800">
                {formatWeight(pet.weight)}
              </div>
            </div>
          )}

          {pet.microchipId && (
            <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 text-orange-700">
                <MapPin size={16} />
                <span>마이크로칩</span>
              </div>
              <div className="text-xs font-mono text-orange-800">
                {pet.microchipId}
              </div>
            </div>
          )}
        </div>

        {/* 등록일 */}
        <div className="pt-3 border-t border-orange-100 text-center">
          <div className="text-xs text-orange-500">
            등록일: {new Date(pet.createdAt).toLocaleDateString('ko-KR')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 로딩 컴포넌트
const PetsLoading: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="bg-white/80 backdrop-blur-sm border-orange-100">
          <CardHeader>
            <div className="h-6 bg-orange-100 rounded animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-orange-100 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-orange-100 rounded animate-pulse" />
              <div className="h-4 bg-orange-100 rounded animate-pulse w-3/4 mx-auto" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// 메인 프로필 페이지
const ProfilePage: React.FC = () => {
  const { user, isLoaded } = useUser();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 펫 데이터 가져오기
  const fetchPets = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/pets');
      const data = await response.json();
      
      if (data.success) {
        setPets(data.data || []);
      } else {
        setError(data.error || '반려동물 정보를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('펫 데이터 가져오기 실패:', error);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchPets();
    } else if (isLoaded && !user) {
      setIsLoading(false);
    }
  }, [isLoaded, user]);

  // 펫 수정 핸들러
  const handleEdit = (pet: Pet) => {
    // 수정 기능 구현 (모달이나 별도 페이지로 이동)
    alert(`${pet.name} 정보 수정 기능은 준비 중입니다.`);
  };

  // 펫 삭제 핸들러
  const handleDelete = async (petId: string) => {
    if (!confirm('정말로 이 반려동물 정보를 삭제하시겠습니까?')) return;
    
    try {
      // DELETE API 구현 필요
      alert('삭제 기능은 준비 중입니다.');
    } catch (error) {
      console.error('펫 삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  // 로그인하지 않은 경우
  if (isLoaded && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-orange-100">
          <CardHeader className="text-center">
            <CardTitle className="text-orange-800">
              <User className="mx-auto mb-2 h-8 w-8" />
              로그인이 필요합니다
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-orange-600">
              반려동물 정보를 보려면 먼저 로그인해주세요.
            </p>
            <Link href="/">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                홈으로 돌아가기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* 헤더 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="outline" className="border-orange-200">
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-orange-800">내 반려동물</h1>
            <Link href="/api/register">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <PlusCircle className="mr-2 h-4 w-4" />
                새 반려동물 등록
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 사용자 정보 섹션 */}
        {user && (
          <section className="mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  내 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-100">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt="프로필"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-orange-400">
                        <User size={24} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-800">
                      {user.firstName && user.lastName 
                        ? `${user.firstName} ${user.lastName}`
                        : user.emailAddresses[0]?.emailAddress
                      }
                    </h3>
                    <p className="text-sm text-orange-600">
                      {user.emailAddresses[0]?.emailAddress}
                    </p>
                    <p className="text-xs text-orange-500">
                      가입일: {new Date(user.createdAt || '').toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* 반려동물 목록 섹션 */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-orange-800 mb-2">
              등록된 반려동물 ({pets.length}마리)
            </h2>
            <p className="text-orange-600">
              소중한 가족들의 정보를 확인하고 관리하세요.
            </p>
          </div>

          {/* 로딩 상태 */}
          {isLoading && <PetsLoading />}

          {/* 오류 상태 */}
          {error && (
            <Card className="bg-white/80 backdrop-blur-sm border-red-100">
              <CardContent className="text-center py-12">
                <div className="text-red-500 mb-4">⚠️</div>
                <h3 className="text-lg font-medium text-red-600 mb-2">
                  오류가 발생했습니다
                </h3>
                <p className="text-red-500 mb-4">{error}</p>
                <Button 
                  onClick={fetchPets}
                  variant="outline"
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  다시 시도
                </Button>
              </CardContent>
            </Card>
          )}

          {/* 반려동물이 없는 경우 */}
          {!isLoading && !error && pets.length === 0 && (
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100">
              <CardContent className="text-center py-12">
                <Heart className="mx-auto h-16 w-16 text-orange-300 mb-4" />
                <h3 className="text-lg font-medium text-orange-600 mb-2">
                  등록된 반려동물이 없습니다
                </h3>
                <p className="text-orange-500 mb-6">
                  첫 번째 가족을 등록해보세요!
                </p>
                <Link href="/api/register">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    반려동물 등록하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* 반려동물 목록 */}
          {!isLoading && !error && pets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;