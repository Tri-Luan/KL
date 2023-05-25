import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectCurrentToken} from "../../redux/authSlice";

const RequireAuth = ({ allowedRoles }) => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return (
    // auth?.roles?.find(role=>allowedRoles?.includes(role))
    //     ?<Outlet/>
    //     :
    token? (
      // <Navigate to="/unauthorized" state={{ from: location }} replace />
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  );
};

export default RequireAuth;
