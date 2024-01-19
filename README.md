# Project Setup

## Database

Default DBMS is mysql/mariadb. Install mysql/mariadb and create database with the name you want. If you want to use another DBMS, you can change the `dataSource.ts` file in the `src/config` directory.

## Environment Variable

If you are in development mode, create a `.env.dev` file in the root directory of the project and add the following variables:

```
CLIENT_URL=http://localhost:4000

PORT=3000 # port on which the server will listen

DB_HOST=localhost # host(ip) of the database
DB_PORT=3306 # port of the database
DB_USER=root # username of the database
DB_PASSWORD=pwd # password of the database
DB_NAME=example # name of the database, which you created in the previous step
```

# 언제든지

이 프로젝트는 개인의 일정을 통합해 모임의 일정을 쉽게 정할 수 있게 도와주는 웹 서비스입니다. 각자 개인의 일정을 '개인 일정'페이지에서 등록하고 '사적 모임'을 생성하여 친구를 초대한 뒤 각자의 일정을 비교해 **최적의** 모임 일정을 정해보세요!

## 실행방법

- database

생성기본 데이터베이스 관리 시스템(DBMS)은 MySQL/MariaDB입니다. MySQL 또는 MariaDB를 설치하고 원하는 이름의 데이터베이스를 생성하세요. 다른 DBMS를 사용하려면 src/config 디렉토리에 있는 dataSource.ts 파일을 변경할 수 있습니다.

- .env.dev 파일 생성

```
CLIENT_URL=http://localhost:4000

PORT=3000 # port on which the server will listen

DB_HOST=localhost # host(ip) of the database
DB_PORT=3306 # port of the database
DB_USER=root # username of the database
DB_PASSWORD=pwd # password of the database
DB_NAME=example # name of the database, which you created in the previous step
```

를 작성하시면 됩니다.
그 후

```bash
npm install
npm run dev
```

를 하시면 http://localhost:3000에서 실행됩니다.
