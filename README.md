# Secret Server Coding Task

## Introduction

Your task is to implement a secret server and a React UI to manage the secrets. The secret server can be used to store and share secrets
using the random generated URL. But the secret can be read only before the expiration time. The secret may have TTL. After the expiration time the secret
won’t be available anymore. You can find the detailed API documentation in the swagger.yaml file.
We recommend to use [Swagger](https://editor.swagger.io/) or any other OpenAPI implementation to
read the documentation.

## Task

**Implementation**: You have to implement the whole Secret Server API in NodeJS and MongoDB with any framework of your choice. However it would be wise to store the data using encryption, now this is not part of the task. You can use plain text to store your secrets.
Also create a React.js UI for it, where the user can add and list the secrets.

**Response types**
The API must be able to response with JSON, based on the [Accept header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept). Other response types (such as YAML) might be added later so prepare your code to be extandable.

**Hosting**: You also have to deploy and host the service. There are plenty of free solutions to do this. So this shouldn't
be an issue. If this API was used in production, then HTTPS would be a must but this is not the case now. It is allowed to use HTTP too.

**Share the code**: Upload the code to your GitHub account and share with us.

## Questions

It is totaly OK to ask if something is not clear.

# How to run locally

## API

1. cd into the api folder

2. Set your .env variables or use the default ones.

```bash
PORT=4000
MONGO_URL=mongodb://localhost:27017
ORIGIN_URL=http://localhost:3000
```

3. After that, run the followings commands:

```bash
npm install

npm run build

npm run start
```

## Client

1. cd into the client folder

2. The same as you did for the API, set your .env variables or use the default one.

```bash
REACT_APP_BASE_URL=http://localhost:4000
```

3. After that, run the next commands:

```bash
npm install

npm run start
```

## Docker

### API

To run the API with docker in development mode (with a local MongoDB service) you can use the following command:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

To run the "production" version of the API with docker:

```bash
docker-compose up -d
```

-- Note: your MONGO_URL .env variable should be set to mongodb://database:27017 so it can connect to the local MongoDB service that comes in the docker-compose files.

### Client

To run the client with docker in dev mode you can use the following command:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

The same goes for "production" mode:

```bash
docker-compose up -d
```

-- Note: your REACT_APP_BASE_URL .env variable should be set to http://localhost:4000 so it can connect to the local API, which is running in docker or locally.
