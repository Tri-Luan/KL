import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/authApiSlice";
import { setUser, setToken } from "../../redux/authSlice";
import Cookies from "universal-cookie";
import { useGetUserMutation } from "../../redux/usersApiSlice";
import { FireIcon } from "@heroicons/react/24/solid";
import { Spinner } from "flowbite-react";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname || "/";
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const [formValid, setFormValid] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const [getUser] = useGetUserMutation();
  const cookies = new Cookies();
  useEffect(() => {
    if (userName !== "" && password !== "") {
      setFormValid(true);
    }
  }, [userName, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName === "" && password === "") {
      return;
    }
    try {
      const authData = await login({ userName, password }).unwrap();
      if (authData.isSuccessful) {
        dispatch(setToken(authData.token));
        const response = await getUser(authData.userId);
        dispatch(setUser(response.data));
        sessionStorage.setItem("persist", true);
        cookies.set("jwt_refresh", authData.token.refreshToken, { path: "/" });
        cookies.set("jwt_access", authData.token.accessToken, { path: "/" });
        cookies.set("user_id", authData.userId, { path: "/" });
        navigate(from, { replace: true });
      } else {
        setPassword("");
        setErrMessage(authData.errorMessage);
      }
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMessage("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMessage("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMessage("Unauthorized");
      } else {
        setErrMessage("Login Failed");
      }
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {isLoading ? (
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner" />
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          <div>
            <FireIcon className="mx-auto h-12 text-[#5089eb]"></FireIcon>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Login to your account
            </h2>
            <p className="mt-2 text-center text-md text-gray-600">
              Or
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                &nbsp; register
              </Link>
            </p>
            {errMessage !== null ? (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <p>{errMessage}</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="relative z-0 w-full mb-8 group">
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  autoComplete="off"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label
                  htmlFor="userName"
                  className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >
                  User name
                </label>
              </div>

              <div className="relative z-0 w-full mb-8 group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="group relative disabled:bg-indigo-500 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={!formValid}
              >
                {!formValid ? (
                  <span
                    className="absolute inset-y-0 left-0 flex items-center pl-3"
                    disabled={!formValid}
                  >
                    <svg
                      className="h-5 w-5 text-indigo-300 "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                ) : null}
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
