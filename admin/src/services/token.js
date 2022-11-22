export const getLocalAccessToken = () => {
  return JSON.parse(localStorage.getItem("accessToken"));
}

export const updateLocalAccessToken = (token) => {
  localStorage.setItem("accessToken", JSON.stringify(token));
}

