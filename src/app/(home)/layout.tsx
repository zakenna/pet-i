import React from "react";
import HomeLayout from "../modules/home-layout/home-layout";

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <div>
      <HomeLayout>
        {children}
      </HomeLayout>
    </div>
  );
};

export default layout;