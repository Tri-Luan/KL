import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import { useRefreshMutation } from "../../redux/authApiSlice";
import { selectCurrentToken, setToken, setUser } from "../../redux/authSlice";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
const PersistLogin = () => {
  const [persist] = usePersist();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
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
        const userId = cookies.get("user_id");
        console.log("verifying refresh token");
        try {
          const response = await refresh(body);

          if (userId !== undefined) dispatch(setUser({ id: userId }));
          //const { accessToken } = response.data
          if (response.isSuccessful) {
            dispatch(setToken(response.token));
          } else {
            dispatch(setToken({ accessToken: cookies.get("jwt_access") }));
          }
          console.log(cookies.get("user_id"));
          console.log(response);
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
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
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
  } else if (isError) {
    //persist: yes, token: no
    content = (
      <p className="errmsg">
        {error.data?.message}
        <Link to="/login">Please login again</Link>.
      </p>
    );
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
