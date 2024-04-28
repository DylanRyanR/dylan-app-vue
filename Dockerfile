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
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"
