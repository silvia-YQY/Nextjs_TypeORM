# 初始代码

# 启动数据库
```$xslt
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

以下是 Windows 旧版 Docker 客户端（Toolbox）的命令（推荐 Windows 用户使用这一版客户端，很稳）
docker run -v "blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

```

# 进入容器
```
docker ps
docker exec -it 容器id bash
psql -U blog
```

# 清空之前的开发环境
```$xslt
docker kill 容器id
docker rm 容器id
rm -rf blog-data

或

docker contaniner prune // 删除所有容器
docker volume rm `id`

```

# 创建数据库
```
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```


# 升级数据表

首先修改ormconfig.json中的host，对应docker的host，然后运行

```$xslt
yarn m:run
yarn dev
node dist/seed.js
```



## 开发

```bash
yarn dev
# or
npm run dev
```

## 部署

```bash 
yarn build
yarn start
```

