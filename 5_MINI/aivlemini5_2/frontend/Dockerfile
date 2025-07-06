# 1단계: Build Stage
FROM node:18 AS builder

WORKDIR /app
COPY . .

# 필요시 ENV 설정 (안 해도 OK)
ARG VUE_APP_API_HOST
RUN echo "VITE_API_BASE_URL=$VUE_APP_API_HOST" > .env.production

RUN npm install
RUN npm run build

# 2단계: Production Stage (정적 서버)
FROM webratio/nodejs-http-server

COPY --from=builder /app/dist /opt/www
COPY run.sh /opt/run.sh

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 8080
ENTRYPOINT ["sh", "/opt/run.sh"]
