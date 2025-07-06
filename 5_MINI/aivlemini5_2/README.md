# KT AIVLE SCHOOL 5차 미니프로젝트_14조
# aivle 걷다가서재
### AI 기반 자동 출간 및 구독 플랫폼 도메인 주도 설계(DDD) 와 마이크로서비스 아키텍처(MSA) 기반으로 구현된 클라우드 네이티브 애플리케이션 프로젝트

## Model
[www.msaez.io/#/105428209/storming/a4fed3a08dabf2ac2bf71d44a1962d32123](https://www.msaez.io/#/61006212/storming/a4fed3a08dabf2ac2bf71d44a1962d32)

## Before Running Services
### Make sure there is a Kafka server running
```
cd kafka
docker-compose up
```
- Check the Kafka messages:
```
cd infra
docker-compose exec -it kafka /bin/bash
cd /bin
./kafka-console-consumer --bootstrap-server localhost:9092 --topic
```

## Run the backend micro-services
See the README.md files inside the each microservices directory:

- authorservice
- scriptservice
- aiservice
- userservice
- libraryservice
- pointservice
- readservice


## Run API Gateway (Spring Gateway)
```
cd gateway
mvn spring-boot:run
```

## Test by API
- authorservice
```
 http :8088/authors id="id"authorName="authorName"email="email"phone="phone"introduction="introduction"portfolioUrl="portfolioUrl"isApproved="isApproved"
```
- scriptservice
```
 http :8088/scripts id="id"title="title"content="content"authorId="authorId"authorName="authorName"notifyStatus="notifyStatus"
```
- aiservice
```
 http :8088/publishings id="id"title="title"authorId="authorId"authorName="authorName"category="category"content="content"summaryContent="summaryContent"coverImagePath="coverImagePath"pdfPath="pdfPath"price="price"notifyStatus="notifyStatus"manuscriptId="manuscriptId"
```
- userservice
```
 http :8088/userInfos id="id"userName="userName"isPurchase="isPurchase"planStartDate="planStartDate"planEndDate="planEndDate"loginId="loginId"loginPw="loginPw"
```
- libraryservice
```
 http :8088/books id="id"title="title"authorName="authorName"category="category"content="content"summaryContent="summaryContent"image="image"pdfPath="pdfPath"price="price"isBestSeller="isBestSeller"subscriptionCount="subscriptionCount"
```
- pointservice
```
 http :8088/points id="id"point="point"readingId="readingId"userId="userId"
```
- readservice
```
 http :8088/readings id="id"isPurchase="isPurchase"statusMessage="statusMessage"userId="userId"bookId="bookId"
```


## Run the frontend
```
cd frontend
npm i
npm run serve
```

## Test by UI
Open a browser to localhost:8088

## Required Utilities

- httpie (alternative for curl / POSTMAN) and network utils
```
sudo apt-get update
sudo apt-get install net-tools
sudo apt install iputils-ping
pip install httpie
```

- kubernetes utilities (kubectl)
```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

- aws cli (aws)
```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

- eksctl 
```
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
```
