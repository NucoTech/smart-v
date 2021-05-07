#! /bin/bash

# 复制nginx配置文件
echo "复制nginx配置文件"
cp smartV.conf /etc/nginx/conf.d/smartV.conf

# 下载依赖
echo "下载nodejs依赖"
yarn

# 启动服务
echo "启动服务"
yarn start
