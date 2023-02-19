import axios from 'axios';
import queryString from "query-string";

const stringifiedParams = queryString.stringify({
  client_id: process.env.FACEBOOK_APP_ID,
  redirect_uri: `${process.env.BASE_URL}/facebook/callback`,
  scope: ['email', 'user_friends'].join(','), // comma seperated string
  response_type: 'code',
  auth_type: 'rerequest',
  display: 'popup',
});

export const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

export const getAccessTokenFromCodeFacebook = async (code) => {
  const { data } = await axios({
    url: 'https://graph.facebook.com/v4.0/oauth/access_token',
    method: 'get',
    params: {
      client_id: process.env.FACEBOOK_APP_ID,
      client_secret: process.env.FACEBOOK_APP_SECRET,
      redirect_uri: `${process.env.BASE_URL}/facebook/callback`,
      code,
    },
  });
  return data.access_token; // { access_token, token_type, expires_in }
};

export const getFacebookUserData = async (access_token) => {
  const { data } = await axios({
    url: 'https://graph.facebook.com/me',
    method: 'get',
    params: {
      fields: ['id', 'email', 'first_name', 'last_name'].join(','),
      access_token: access_token,
    },
  });
  return data;// { id, email, first_name, last_name }
};