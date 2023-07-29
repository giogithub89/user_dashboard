import React from "react";
import { Outlet } from "react-router-dom";

const BagContentsLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BagContentsLayout;
