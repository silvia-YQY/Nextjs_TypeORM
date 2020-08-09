import {GetServerSideProps, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import {useEffect, useState} from 'react';
import {createConnection, getConnection} from "typeorm";
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import {Post} from "../src/entity/Post";

type Props = {
  posts:Post[]
}
const index: NextPage<Props> = (props) => {
  const {posts} = props;

  console.log('post',posts)
  return (
    <div>
      {posts.map(post =>{
        <div key={post.id}>{post.title}</div>
      })}
    </div>
  );
};

export default index;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post)
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};
