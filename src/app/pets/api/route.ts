// app/api/pets/route.ts
import { useAuth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = useAuth();

  if (!userId) {
    return NextResponse.json(
      { success: false, error: "로그인이 필요합니다." },
      { status: 401 }
    );
  }

  const body = await req.json();

  // 여기에 DB 저장 코드가 들어감 (예: Supabase, Prisma 등)
  console.log("저장할 데이터:", body);

  // 예시: DB 저장이 성공했다고 가정
  return NextResponse.json({ success: true });
}
