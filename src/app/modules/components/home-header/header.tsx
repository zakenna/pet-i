"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const { isSignedIn, isLoaded } = useUser();
  
  // 모든 훅을 컴포넌트 최상단에서 호출 (조건부 호출 금지)
  let sidebarState = null;
  let toggleSidebar = null;
  let isMobile = false;
  let open = false;
  
  try {
    const sidebarContext = useSidebar();
    sidebarState = sidebarContext.state;
    toggleSidebar = sidebarContext.toggleSidebar;
    isMobile = sidebarContext.isMobile;
    open = sidebarContext.open;
  } catch {
    // SidebarProvider 밖에서 호출되면 null 값들 유지
  }

  // 환경변수 체크 추가
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Clerk 키가 없으면 간단한 헤더만 렌더링
  if (!publishableKey) {
    return (
      <header className="h-[64px] bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50 w-full flex items-center">
        <div className="px-4 w-full">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold">Pet-I</h1>
              <p>™</p>
            </Link>
            <div className="text-sm text-orange-600">
              환경설정 중...
            </div>
          </div>
        </div>
      </header>
    );
  }

  // 로그인하지 않은 상태에서는 사이드바 기능 없는 헤더
  if (!isLoaded || !isSignedIn) {
    return (
      <header className="h-[64px] bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40 w-full flex items-center">
        <div className="px-4 lg:px-6 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2">
                <h1 className="text-lg lg:text-xl font-semibold text-orange-800">Pet-I</h1>
                <p className="pb-1.5 text-orange-600">™</p>
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              {!isLoaded ? (
                <div className="flex space-x-2">
                  <div className="w-16 h-8 bg-orange-100 rounded animate-pulse"></div>
                  <div className="w-20 h-8 bg-orange-100 rounded animate-pulse"></div>
                </div>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                      로그인
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal" forceRedirectUrl="/api/register">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      회원가입
                    </Button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  // 로그인한 상태 헤더
  return (
    <header className="h-[64px] bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-40 w-full flex items-center">
      <div className="px-4 lg:px-6 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* 사이드바 토글 버튼 - 로그인한 사용자만 */}
            {toggleSidebar && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50 transition-colors"
                title={sidebarState === "collapsed" || (isMobile && !open) ? "사이드바 열기" : "사이드바 닫기"}
              >
                {sidebarState === "collapsed" || (isMobile && !open) ? (
                  <Menu className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </Button>
            )}

            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-lg lg:text-xl font-semibold text-orange-800">Pet-I</h1>
              <p className="pb-1.5 text-orange-600">™</p>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "shadow-lg border-orange-100",
                  userButtonPopoverActionButton: "hover:bg-orange-50",
                  userButtonPopoverActionButtonText: "text-orange-700",
                  userButtonPopoverActionButtonIcon: "text-orange-600"
                }
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;