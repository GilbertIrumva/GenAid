import { Navigate, useLocation } from "react-router-dom";
import { getUser, isAuthenticated } from "@/utils/auth";

/**
 * Guard a child route based on role. Use AFTER `<RequireAuth>` so we know
 * a user exists. If the role doesn't match, send the user back to the admin
 * home rather than the login screen — they ARE logged in, just not for this.
 */
export default function RequireRole({
  role,
  children,
}: {
  role: "admin" | "editor";
  children: React.ReactNode;
}) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const user = getUser();
  if (!user || user.role !== role) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
