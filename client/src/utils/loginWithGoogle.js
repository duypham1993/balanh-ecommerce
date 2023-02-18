import queryString from "query-string";

const stringifiedParams = queryString.stringify({
  client_id: process.env.REACT_APP_OAUTH_GOOGLE_LOGIN_ID,
  redirect_uri: "http://localhost:8000/api/authClient/google",
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '),
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent'
});

export const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;