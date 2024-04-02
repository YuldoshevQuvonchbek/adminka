import React from "react";
import { useLocation } from "react-router-dom";

export const UseSkror = () => {
  const locati = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }),
    [locati];
  return null;
};
