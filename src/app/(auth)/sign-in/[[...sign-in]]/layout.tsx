import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default layout;