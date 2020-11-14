// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from "next-iron-session";
import { NextApiHandler } from "next";

export default function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    // 对cookie加密的秘钥,存储在环境变量中，读取
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "blog",
    cookieOptions: { secure: false },
  });
}
