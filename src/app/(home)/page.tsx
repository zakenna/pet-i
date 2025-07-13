import React from 'react';
import LogoutPage from '../modules/components/home-contents/logout/page';
import LoginPage from '../modules/components/home-contents/login/page';

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 max-w-full">
      {/* 로그아웃 페이지 */}
      <LogoutPage />

      {/* 로그인 페이지 */}
      <LoginPage />
    </div>
  );
};

export default HomeLayout;