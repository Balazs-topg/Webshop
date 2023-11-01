import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

function getIsLoggedInFrontEndServerSide(cookieStore: ReadonlyRequestCookies) {
  let isLoggedIn = true;
  try {
    cookieStore.get("jwt")!.value;
  } catch {
    isLoggedIn = false;
  }
  const isLoggedInConst = isLoggedIn;
  return isLoggedInConst;
}
export default getIsLoggedInFrontEndServerSide;
