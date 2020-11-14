// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from "next-iron-session";
import { NextApiHandler } from "next";

export default function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    // 对cookie加密的秘钥
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: "8eaac080-eb0d-4b03-9cf6-901a590c0b3b",
    cookieName: "blog",
    cookieOptions: { secure: false },
  });
}
