export const baseUrl = "http://128.199.205.167:80/api/v1.0";

// export const serverUrl = 'http://128.199.172.148:4000/jobe/index.php/restapi/';
export const ApiPaths = {
  auth: "/authentications",
  user: "/users",
  refreshToken: "refreshtoken",
  course: {
    root: "/courses",
    detail: "/details",
    register: "/register",
    comment: "/comment",
    management: { root: "/management", detail: "/details", hidden: "/hidden" },
  },
};
