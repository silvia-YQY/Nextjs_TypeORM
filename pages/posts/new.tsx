import { NextPage } from "next";
import { Form } from "../../components/Form";
import { useCallback, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useForm } from "../../hooks/useForm";

const PostsNew: NextPage = () => {
  const initFormData = {
    title: "",
    content: "",
  };
  const buttons = (
    <>
      <button type="submit">提交</button>
    </>
  );
  const onSubmit = (formData: typeof initFormData) => {
    axios.post(`/api/v1/posts`, formData).then(
      () => {},
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
    console.log("submit");
  };
  const { form, setErrors } = useForm(
    initFormData,
    [
      {
        label: "标题",
        type: "text",
        key: "title",
      },
      {
        label: "内容",
        type: "textarea",
        key: "content",
      },
    ],
    buttons,
    onSubmit
  );
  return <div>{form}</div>;
};

export default PostsNew;
