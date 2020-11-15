import { NextPage } from "next";
import { useCallback, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Form } from "../components/Form";
import { useForm } from "../hooks/useForm";

const SignUp: NextPage = () => {
  const { form } = useForm({
    initFormData: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    fields: [
      {
        label: "用户名",
        type: "text",
        key: "username",
      },
      {
        label: "密码",
        type: "password",
        key: "password",
      },
      {
        label: "确认密码",
        type: "password",
        key: "passwordConfirmation",
      },
    ],
    buttons: <button type="submit">注册</button>,
    submit: {
      request: (formData) => axios.post(`/api/v1/users`, formData),
      message: "提交成功",
    },
  });
  return (
    <div>
      <h1>注册</h1>
      <hr />
      {form}
    </div>
  );
};

export default SignUp;
