import axios from "../api/axios";

import { ApiPaths } from "../shared/api-paths";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(ApiPaths.refreshToken, {});
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.token);
      return { ...prev, accessToken: response.data.token.accessToken };
    });
    return response.data.token.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
