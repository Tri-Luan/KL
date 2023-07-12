import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import { useRefreshMutation } from "../../redux/authApiSlice";
import { selectCurrentToken, setToken, setUser } from "../../redux/authSlice";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { useGetUserMutation } from "../../redux/usersApiSlice";
const PersistLogin = () => {
  const [persist] = usePersist();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [getUser] = useGetUserMutation();
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode
      const verifyRefreshToken = async () => {
        const body = {
          refreshToken: cookies.get("jwt_refresh"),
          accessToken: cookies.get("jwt_access"),
        };
        if (body.refreshToken || body.accessToken) {
          const userId = cookies.get("user_id");
          console.log("verifying refresh token");
          try {
            const response = await refresh(body);
            if (response.data.isSuccessful) {
              dispatch(setToken(response.token));
            } else {
              dispatch(setToken({ accessToken: cookies.get("jwt_access") }));
            }
            if (userId !== undefined) {
              const user = await getUser(userId);
              dispatch(setUser(user.data));
            }
            setTrueSuccess(true);
          } catch (err) {
            console.error(err);
          }
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);
    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, verifyRefreshToken: isLoading
  } else if (isError) {
    //persist: yes, token: no
    // content = (
    //   <p className="errmsg">
    //     {error.data?.message}
    //     <Link to="/login">Please login again</Link>.
    //   </p>
    // );
    console.log("error");
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    content = <Outlet />;
  }
  return content;
};
export default PersistLogin;
