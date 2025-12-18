import { routerPaths } from "@/router";
import { selectorIsAuthenticated } from "@/store/user/selectors";
import React, { type FC } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/user/userStore";

interface RouteGuardProps {
  children: React.ReactNode;
  type: "auth" | "public" | "private";
}

export const RouteGuard: FC<RouteGuardProps> = ({ type, children }) => {
  const isAuthenticated = useUserStore(selectorIsAuthenticated);

  if (type === "auth" && isAuthenticated) {
    return <Navigate to={routerPaths.notes} replace />;
  }

  if (type === "private" && !isAuthenticated) {
    return <Navigate to={routerPaths.auth} replace />;
  }

  return <>{children}</>;
};
