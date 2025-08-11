import { Suspense } from 'react';
import { db } from '@/app/db';
import { pets } from '@/app/db/schema';
import { eq } from 'drizzle-orm';
import { auth, currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Scale, Heart, MapPin } from 'lucide-react';

// 펫 데이터 타입
type Pet = {
  id: string;
  name: string;
  type: string;
  breed: string | null;
  gender: string | null;
  birthDate: Date | null;
  weight: string | null;
  color: string | null;
  microchipId: string | null;
  profileImage: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// 펫 카드 컴포넌트
function PetCard({ pet }: { pet: Pet }) {
  const calculateAge = (birthDate: Date | null) => {
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

  const formatWeight = (weight: string | null) => {
    if (!weight) return null;
    return `${parseFloat(weight)}kg`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{pet.name}</CardTitle>
          {!pet.isActive && (
            <Badge variant="secondary">비활성</Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 프로필 이미지 */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100">
            {pet.profileImage ? (
              <Image
                src={pet.profileImage}
                alt={`${pet.name}의 프로필`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Heart size={40} />
              </div>
            )}
          </div>
        </div>

        {/* 기본 정보 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{pet.type}</Badge>
            {pet.breed && <Badge variant="outline">{pet.breed}</Badge>}
            {pet.gender && (
              <Badge variant="outline" className={
                pet.gender === 'male' ? 'bg-blue-50 text-blue-700' : 
                pet.gender === 'female' ? 'bg-pink-50 text-pink-700' : 
                'bg-gray-50 text-gray-700'
              }>
                {pet.gender === 'male' ? '수컷' : 
                 pet.gender === 'female' ? '암컷' : '성별미상'}
              </Badge>
            )}
          </div>

          {pet.color && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div 
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: pet.color.toLowerCase() }}
              />
              <span>{pet.color}</span>
            </div>
          )}
        </div>

        {/* 상세 정보 */}
        <div className="grid grid-cols-1 gap-3 text-sm">
          {pet.birthDate && (
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarDays size={16} />
              <span>{calculateAge(pet.birthDate)}</span>
              <span className="text-xs text-gray-400">
                ({new Date(pet.birthDate).toLocaleDateString('ko-KR')})
              </span>
            </div>
          )}

          {pet.weight && (
            <div className="flex items-center gap-2 text-gray-600">
              <Scale size={16} />
              <span>{formatWeight(pet.weight)}</span>
            </div>
          )}

          {pet.microchipId && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} />
              <span className="text-xs">마이크로칩: {pet.microchipId}</span>
            </div>
          )}
        </div>

        {/* 등록일 */}
        <div className="pt-2 border-t text-xs text-gray-400">
          등록일: {new Date(pet.createdAt).toLocaleDateString('ko-KR')}
        </div>
      </CardContent>
    </Card>
  );
}

// 펫 목록 컴포넌트
async function PetsList({ userId }: { userId: string }) {
  const userPets = await db
    .select()
    .from(pets)
    .where(eq(pets.userId, userId));

  if (userPets.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          등록된 반려동물이 없습니다
        </h3>
        <p className="text-gray-500 mb-6">
          첫 번째 반려동물을 등록해보세요!
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          반려동물 등록하기
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {userPets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}

// 로딩 컴포넌트
function PetsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// 메인 프로필 페이지
export default async function ProfilePage() {
  // 현재 로그인한 사용자 정보 가져오기
  const { userId } = await auth();
  
  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            로그인이 필요합니다
          </h1>
          <p className="text-gray-600">
            반려동물 정보를 보려면 먼저 로그인해주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          내 반려동물
        </h1>
        <p className="text-gray-600">
          등록된 반려동물들의 정보를 확인하고 관리하세요.
        </p>
      </div>

      <Suspense fallback={<PetsLoading />}>
        <PetsList userId={userId} />
      </Suspense>
    </div>
  );
}