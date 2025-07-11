import React from "react";
import { Header } from "../components/home-header/header";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="min-h-screen max-w-full ">
      <div className="flex w-full border-2">
        <Header />
      </div>
      <div>
        <div className="flex max-w-full h-screen">
          <div className="border-2 h-full w-64">
            this is home-side-bar
          </div>
          <div className="border-2 h-full w-full">
            this is home-container
          </div>
        </div>
      </div>
    </div >
  );
};

export default HomeLayout;
