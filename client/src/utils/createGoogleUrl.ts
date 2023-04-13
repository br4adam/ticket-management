const createGoogleUrl = (): string => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    response_type: "code",
    prompt: "consent",
    scope: ["openid", "email", "profile"].join(" ")
  }
  const query = new URLSearchParams(options)
  return `${rootUrl}?${query.toString()}`
}

export default createGoogleUrl