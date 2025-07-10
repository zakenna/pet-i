
import { Header } from "../components/home-header/header";
import React from "react";

interface HomeLayoutProps{
  children: React.ReactNode;
}

const HomeLayout = ({children}:HomeLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <div className=" flex border-2">
        {children}
        <Header />
      </div>
    </div>
  );
};

export default HomeLayout;
