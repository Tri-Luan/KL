export const baseUrl = "http://209.97.172.240/api/v1.0";

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
    comments: "/comments",
    commentAction: "/commentAction",
    replyComment: "/replycomment",
    replyCommentAction: "/replyCommentAction",
    themes: "/themes",
    codeLanguages: "/codeLanguages",
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
      submit: "/submit",
      histories: "/histories",
      comment: "/comment",
      comments: "/comments",
      commentAction: "/commentAction",
      replyComment: "/replycomment",
      replyCommentAction: "/replyCommentAction",
      leaderboard: "/leaderboard",
    },
  },
  practice: {
    root: "/practices",
    detail: "/details",
    levels: "/levels",
    management: { root: "/management", detail: "/details", hidden: "/hidden" },
    run: "/run",
    submit: "/submit",
    histories: "/histories",
    leaderboard: "/leaderboard",
  },
  discussion: {
    root: "/discussions",
    comment: "/comment",
    comments: "/comments",
    commentAction: "/commentAction",
    replyComment: "/replycomment",
    replyCommentAction: "/replyCommentAction",
    detail: "/details",
  },
};
