import jwt from "jsonwebtoken";
import AccountModel from "../models/AccountModel";
/**
 * Check login status
 * returns boolean
 */
export default function getIsLoggedIn(request: Request) {
  const reqJwt = request.headers.get("jwt");
  return reqJwt ? true : false;
}
