import axios from 'axios';
import queryString from "query-string";

const stringifiedParams = queryString.stringify({
  client_id: process.env.OAUTH_GOOGLE_LOGIN_ID,
  redirect_uri: "http://localhost:5001/google/callback",
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ].join(' '),
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent'
});

export const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

export const getAccessTokenFromCode = async (code) => {
  try {
    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: 'post',
      data: {
        client_id: process.env.OAUTH_GOOGLE_LOGIN_ID,
        client_secret: process.env.OAUTH_GOOGLE_LOGIN_SECRET,
        redirect_uri: 'http://localhost:5001/google/callback',
        grant_type: 'authorization_code',
        code,
      },
    });
    return data.access_token;
  } catch (error) {
    console.log("code: ", error);
  }
};

export const getGoogleUserInfo = async (access_token) => {
  try {
    const { data } = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return data;
  } catch (error) {
    console.log("access token: ", error)
  }
};