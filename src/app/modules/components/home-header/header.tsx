"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-3 justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="logo.svg"
                alt="Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <h1 className="text-xl font-semibold pt-6">Pet-I</h1>
              <p className="pt-2">™</p>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            {!isLoaded ? (
              // 로딩 중일 때 스켈레톤 UI
              <div className="flex space-x-2">
                <div className="w-16 h-8 bg-orange-100 rounded animate-pulse"></div>
                <div className="w-20 h-8 bg-orange-100 rounded animate-pulse"></div>
              </div>
            ) : isSignedIn ? (
              // 로그인한 사용자: 사용자 버튼 표시
              <UserButton afterSignOutUrl="/" />
            ) : (
              // 로그인하지 않은 사용자: 로그인/회원가입 버튼 표시
              <>
                <SignInButton mode="modal">
                  <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                    로그인
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
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
};

export default Header;