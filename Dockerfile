FROM nginx
MAINTAINER dylan/414200173@qq.com
ENV RUN_USER nginx
ENV RUN_GROUP nginx
ENV DATA_DIR /data/dist
ENV LOG_DIR /data/log/nginx
RUN mkdir /data/log/nginx -p
RUN chown nginx.nginx -R /data/log/nginx
ADD ./dist /data/dist
ADD nginx_conf/app-vue.conf /etc/nginx/conf.d/default.conf
# 将 shell copy 到 workdir 目录，此处为 /opt
COPY ./main.sh /data
# workdir
WORKDIR /data

# 容器内给shell文件添加所有用户可执行权限
RUN chmod a+x ./main.sh

EXPOSE 80
# 每次容器启动时执行 main.sh shell 文件
CMD ["sh", "main.sh"]
