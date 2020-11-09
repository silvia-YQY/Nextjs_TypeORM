import { NextApiHandler } from "next";
import { getDatabaseConnection } from "../../../lib/getDatabaseConnection";
import { User } from "../../../src/entity/User";
import md5 from "md5";

const Posts: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body;
  const connection = await getDatabaseConnection();

  const errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[],
  };

  if (username.trim === "") {
    errors.username.push("不能为空");
  }
  if (!/[a-zA-Z0-9]/.test(username.trim())) {
    errors.username.push("格式不合法");
  }
  if (username.trim().length > 42) {
    errors.username.push("too long");
  }
  if (username.trim().length < 3) {
    errors.username.push("too short");
  }
  if (password === "") {
    errors.username.push("不能为空");
  }

  if (password !== passwordConfirmation) {
    errors.passwordConfirmation.push("密码不匹配");
  }
  // 应用层进行校验，先查询
  const found = connection.manager.findOne(User, {username});
  if(found) {
    errors.username.push('用户名已存在，不能重复注册')
  }
  
  const hasErrors = Object.values(errors).find((v) => v.length > 0);
  res.setHeader("Content-Type", "application/json; charset=utf-8 ");
  if (hasErrors) {
    res.statusCode = 422;
    res.write(JSON.stringify(errors));
  } else {
    const user = new User();
    user.username = username.trim();
    user.passwordDigest = md5(password);
    await connection.manager.save(user);
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  }
  res.end();
};
export default Posts;
