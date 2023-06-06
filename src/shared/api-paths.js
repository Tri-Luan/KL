export const baseUrl = "http://128.199.205.167:80/api/v1.0";

// export const serverUrl = 'http://128.199.172.148:4000/jobe/index.php/restapi/';
export const ApiPaths = {
  auth: {
    root: "/authentications",
    refreshToken: "/refreshtoken",
    logout: "/logout",
  },
  user: "/users",

  course: {
    root: "/courses",
    detail: "/details",
    register: "/register",
    comment: "/comment",
    management: { root: "/management", detail: "/details", hidden: "/hidden" },
    chapter: {
      root: "/chapters",
      management: "/management",
      hidden: "/hidden",
    },
    lesson: {
      root: "/lessons",
      management: "/management",
      detail: "/details",
      hidden: "/hidden",
      run: "/run",
    },
    codeLanguages: "/codeLanguages",
  },
};
