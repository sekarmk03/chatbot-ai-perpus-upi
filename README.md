# AI Chatbot API for UPI Library
---
```API for AI Chatbot implement Machine Learning model that built for UPI Library.```
## API Docs
[Public Documentation](https://documenter.getpostman.com/view/15801526/2s93RZNAU9)
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/15801526-3606f82a-45fb-4afa-b673-684847165d97?action=collection%2Ffork&collection-url=entityId%3D15801526-3606f82a-45fb-4afa-b673-684847165d97%26entityType%3Dcollection%26workspaceId%3D1d87a7ea-83b1-479e-a277-65138da60cac)
## Public App

## AI Model
This model built by @maoenti
Using Tensorflow and Artificial Neural Network algorithm
[Docker Image](https://hub.docker.com/r/maoenti/library-ai_docker)

## FrontEnd
The User Interface built by @azarnuzy
Using ReactJS

## API Installation
```bash
npm install
```

Before running the app, you need to configure the environment variables in ```.env``` file. You can copy the ```.env.example``` file and rename it to ```.env```.


### Run the app
> **Note:** Make sure you have installed global dependencies: [nodemon](https://www.npmjs.com/package/nodemon), [sequelize-cli](https://www.npmjs.com/package/sequelize-cli).

```bash
npm install -g nodemon sequelize-cli
```

```bash
# Create Database
sequelize db:create

# Migrate Database
sequelize db:migrate

# Run the app
npm run dev
```
