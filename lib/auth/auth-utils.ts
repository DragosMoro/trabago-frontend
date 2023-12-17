export function parseJwt(token: string | null): any {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export function getSocialLoginUrl(name: string): string {
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/${name}?redirect_uri=${process.env.NEXT_PUBLIC_OAUTH2_REDIRECT_URI}`;
}

export const handleLogError = (error: any): void => {
  if (error.response) {
    console.log(error.response.data);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log(error.message);
  }
};
