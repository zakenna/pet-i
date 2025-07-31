import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/app/db';
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
    console.log('🐾 POST /pets/api 요청 받음');

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

    // 반려동물 데이터 준비
    const petData = {
      name: body.name,
      type: body.type, // enum에 맞는 값인지 확인 필요
      breed: body.breed || null,
      gender: body.gender || null,
      birthDate: body.birthDate ? new Date(body.birthDate) : null,
      weight: body.weight ? parseFloat(body.weight) : null,
      color: body.color || null,
      microchipId: body.microchipId || null,
      profileImage: body.profileImage || null,
      // isActive는 기본 true라서 생략 가능
    };


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