import { NextPage } from "next";
import { Form } from "../../components/Form";

const PostsNew: NextPage = () => {
  return (
    <div>
      PostsNew
      <Form fields={[{
          label: '用户名'
      },{
          label: '密码'
      }]} ></Form>
    </div>
  );
};

export default PostsNew;
