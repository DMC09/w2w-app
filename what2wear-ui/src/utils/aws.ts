import { AuthStore } from "@/stores/auth";
import axios from "axios";

export async function getAuthTokens(code: string) {
  const clientID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";
  const clientSecret = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET || "";
  const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN || "";
  const credentials = `${clientID}:${clientSecret}`;


  const base64Credentials = Buffer.from(credentials).toString("base64");
  const basicAuthorization = `Basic ${base64Credentials}`;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: basicAuthorization,
  };
  const data = new URLSearchParams();

  let token = "";

  data.append("grant_type", "authorization_code");
  data.append("client_id", clientID);
  data.append("code", code);
  data.append("redirect_uri", "http://localhost:3000");

  const res = await axios.post<any,any>(
    `${cognitoDomain}/oauth2/token`,
    data,
    {
      headers,
    }
  );
  console.log(res, "response");
  if (res.status !== 200) return;
  const tokenRes = await res?.data

  console.log(tokenRes,'tokens??')

  AuthStore.setState({
    accessToken:tokenRes.access_token,
    idToken: tokenRes.id_token,
    refreshToken:tokenRes.refresh_token
  })
}

export async function getUserInfo(token: any) {
  //get the token from state or the local storage!
  const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN || "";
  const userInfoHeaders = {
    Authorization: "Bearer " + token,
  };
  const res = await axios.get(`${cognitoDomain}/oauth2/userInfo`, {
    headers: userInfoHeaders,
  });

  if (res.status != 200) return;
  const data = await res.data;

  AuthStore.setState({
    user:{
      username: data.username,
      email: data.email
    }
  })

  console.log(data,'data from user endpoint')
}
