"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { isSignedIn, isLoaded } = useUser();

  // 환경변수 체크 추가
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Clerk 키가 없으면 간단한 헤더만 렌더링
  if (!publishableKey) {
    return (
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50 w-full">
        <div className="px-4 py-4 w-full">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold pt-6">Pet-I</h1>
              <p className="pt-2">™</p>
            </Link>
            <div className="text-sm text-orange-600">
              환경설정 중...
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50 w-full">
      <div className="px-4 lg:px-6 py-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* 사이드바 토글 버튼 - 로그인한 사용자만, 모바일에서만 보임 */}
            {isSignedIn && (
              <SidebarTrigger className="lg:hidden text-orange-600 hover:text-orange-700" />
            )}
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-lg lg:text-xl font-semibold">Pet-I</h1>
              <p className="pb-1.5">™</p>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            {!isLoaded ? (
              <div className="flex space-x-2">
                <div className="w-16 h-8 bg-orange-100 rounded animate-pulse"></div>
                <div className="w-20 h-8 bg-orange-100 rounded animate-pulse"></div>
              </div>
            ) : isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                    로그인
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Link href="/pets/register">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      회원가입
                    </Button>
                  </Link>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;