import { NextPage } from "next";
import { useCallback, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

const SignUp: NextPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
    passwordConfirmation: [],
  });
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setErrors({
        username: [],
        password: [],
        passwordConfirmation: [],
      });
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
      console.log(formData);
    },
    [formData]
  );
  return (
    <>
      <h1>登录</h1>
      <hr />
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label>
              用户名
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value,
                  })
                }
              />
            </label>
            {errors.username?.length > 0 ? (
              <div>{errors.username.join(",")}</div>
            ) : null}
          </div>
          <div>
            <label>
              密码
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
            </label>
            {errors.password?.length > 0 && (
              <div>{errors.password.join(",")}</div>
            )}
          </div>
        </div>
        <div>
          <button type="submit">登录</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
