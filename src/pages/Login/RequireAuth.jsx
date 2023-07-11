import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectCurrentUser } from "../../redux/authSlice";

const RequireAuth = ({ allowedRoles }) => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  return (
    // auth?.roles?.find(role=>allowedRoles?.includes(role))
    //     ?<Outlet/>
    // <Navigate to="/unauthorized" state={{ from: location }} replace />
    //     :
    user ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
