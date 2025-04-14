import React from "react";

const Content = ({ children }) => {
  return (
    <div className="bg-dark text-white h-100 p-4">
      {children}
    </div>
  );
};

export default Content;