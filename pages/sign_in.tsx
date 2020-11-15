import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useCallback, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import withSession from "../lib/withSession";
import { User } from "../src/entity/User";
import { Form } from "../components/Form";
import validate = WebAssembly.validate;

const SignIn: NextPage<{ user: User }> = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
  });
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios.post(`/api/v1/sessions`, formData).then(
        () => {
          window.alert("登录成功");
        },
        (error) => {
          if (error.response) {
            const response: AxiosResponse = error.response;
            if (response.status === 422) {
              setErrors(response.data);
            }
          }
          console.log(error.response);
        }
      );
    },
    [formData]
  );

  const onChange = useCallback(
    (key, value) => {
      setFormData({
        ...formData,
        [key]: value,
      });
    },
    [formData]
  );
  return (
    <>
      {props.user ? <div>当前登录用户为{props.user.username}</div> : null}
      <h1>登录</h1>
      <Form
        onSubmit={onSubmit}
        buttons={
          <>
            <button type="submit">登录</button>
          </>
        }
        fields={[
          {
            label: "用户名",
            type: "text",
            value: formData.username,
            onChange: (e) => onChange("username", e.target.value),
            errors: errors.username,
          },
          {
            label: "密码",
            type: "password",
            value: formData.password,
            errors: errors.password,
            onChange: (e) => onChange("password", e.target.value),
          },
        ]}
      />
      <hr />
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get("currentUser");
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  }
);
