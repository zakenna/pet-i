import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { petQueries, userQueries } from '@/app/db/utils';

// GET: 사용자의 모든 반려동물 조회
export async function GET() {
  try {
    console.log('🔍 GET /api/pets 요청 받음');

    const clerkUser = await currentUser();

    if (!clerkUser) {
      console.log('❌ 인증되지 않은 사용자');
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    console.log('✅ 인증된 사용자:', clerkUser.id);

    const pets = await userQueries.getUserPets(clerkUser.id);

    console.log('📋 조회된 반려동물 수:', pets.length);

    return NextResponse.json({
      success: true,
      data: pets
    });
  } catch (error) {
    console.error('❌ 반려동물 조회 실패:', error);
    return NextResponse.json(
      {
        success: false,
        error: '반려동물 정보를 가져오는데 실패했습니다',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST: 새 반려동물 등록
export async function POST(request: NextRequest) {
  try {
    console.log('🐾 POST /api/pets 요청 받음');

    const clerkUser = await currentUser();

    if (!clerkUser) {
      console.log('❌ 인증되지 않은 사용자');
      return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 });
    }

    console.log('✅ 인증된 사용자:', clerkUser.id, clerkUser.emailAddresses[0]?.emailAddress);

    // 요청 본문 파싱
    const body = await request.json();
    console.log('📝 받은 데이터:', body);

    // 필수 필드 검증
    if (!body.name || !body.type) {
      console.log('❌ 필수 필드 누락:', { name: body.name, type: body.type });
      return NextResponse.json(
        {
          success: false,
          error: '이름과 동물 종류는 필수입니다'
        },
        { status: 400 }
      );
    }

    // DB에서 사용자 찾기 또는 생성
    console.log('👤 사용자 정보 처리 중...');
    const dbUser = await userQueries.findOrCreateUser(clerkUser.id, {
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
      firstName: clerkUser.firstName || undefined,
      lastName: clerkUser.lastName || undefined,
      profileImage: clerkUser.imageUrl || undefined,
    });

    console.log('✅ DB 사용자 정보:', { id: dbUser.id, email: dbUser.email });

    // 반려동물 데이터 준비 (타입 호환성 보장)
    const petData = {
      name: String(body.name || '').trim(),
      type: body.type, // enum 값은 이미 검증됨
      breed: body.breed && typeof body.breed === 'string' ? body.breed.trim() : null,
      gender: body.gender && typeof body.gender === 'string' ? body.gender : null,
      birthDate: body.birthDate && typeof body.birthDate === 'string' 
        ? new Date(body.birthDate) 
        : null,
      weight: body.weight && (typeof body.weight === 'string' || typeof body.weight === 'number')
        ? String(parseFloat(String(body.weight))) // DB 스키마에 맞게 string으로 변환
        : null,
      color: body.color && typeof body.color === 'string' ? body.color.trim() : null,
      microchipId: body.microchipId && typeof body.microchipId === 'string' 
        ? body.microchipId.trim() 
        : null,
      profileImage: body.profileImage && typeof body.profileImage === 'string' 
        ? body.profileImage.trim() 
        : null,
    };

    // 데이터 유효성 검증
    if (petData.birthDate && isNaN(petData.birthDate.getTime())) {
      petData.birthDate = null;
    }
    
    if (petData.weight && isNaN(parseFloat(petData.weight))) {
      petData.weight = null;
    }

    console.log('🐕 반려동물 데이터 준비:', petData);

    // 반려동물 생성
    const newPet = await petQueries.createPet(dbUser.id, petData);

    console.log('🎉 반려동물 등록 완료:', { id: newPet.id, name: newPet.name });

    return NextResponse.json({
      success: true,
      data: newPet,
      message: `${newPet.name}이(가) 성공적으로 등록되었습니다!`
    }, { status: 201 });

  } catch (error) {
    console.error('❌ 반려동물 등록 실패:', error);

    // 상세한 에러 정보 반환 (개발 환경에서만)
    const isDevelopment = process.env.NODE_ENV === 'development';

    return NextResponse.json(
      {
        success: false,
        error: '반려동물 등록에 실패했습니다',
        details: isDevelopment && error instanceof Error ? error.message : undefined,
        stack: isDevelopment && error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}