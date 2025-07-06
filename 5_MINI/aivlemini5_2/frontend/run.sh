#!/bin/sh

# (선택) 환경변수 확인용
env > /opt/www/static/env.txt

# 정적 서버 실행 (SPA 지원)
http-server /opt/www -p 8080 --push-state