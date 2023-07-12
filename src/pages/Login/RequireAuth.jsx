import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";


const RequireAuth = ({ allowedRoles }) => {
  const cookies = new Cookies();
  const userId = cookies.get("user_id");
  const location = useLocation();

  return (
    // auth?.roles?.find(role=>allowedRoles?.includes(role))
    //     ?<Outlet/>
    // <Navigate to="/unauthorized" state={{ from: location }} replace />
    //     :
    userId ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
