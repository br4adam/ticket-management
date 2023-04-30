## Ticket Management

<img src="https://user-images.githubusercontent.com/104263751/235360008-413a094e-4344-418e-afaf-05617e72839f.png">

### 💻 About
This is a full-stack ticket management app built with the MERN (MongoDB, Express, React, Node.js) stack.

### 🚀 Run locally
Clone the project using the following command:
```
git clone https://github.com/br4adam/ticket-management
```
Navigate to the project directory using the following command:
```
cd ticket-management
```
Install client dependencies and start the client using the following commands:
```
cd client
npm install
npm run dev
```
Install server dependencies, build, and start the server using the following commands:
```
cd server
npm install
npm run build
npm start
```

### ⚙️ Environment variables
Before running the app, make sure to create `.env` files for both the server and client directories with the following variables:

Client environment variables:
```
VITE_REDIRECT_URI=http://localhost:5173/callback
VITE_SERVER_URL=http://localhost:8000
VITE_CLIENT_ID=<YOUR_GOOGLE_OAUTH_CLIENT_ID>
```

Server environment variables:
```
PORT=8000
MONGO_URI=<THE_URL_OF_YOUR_MONGODB_DATABASE>
GOOGLE_CLIENT_ID=<YOUR_GOOGLE_OAUTH_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_OAUTH_SECRET_KEY>
GOOGLE_REDIRECT_URI=http://localhost:5173/callback
JWT_SECRET_KEY=<YOUR_JWT_SECRET_KEY>
TOKEN_EXPIRATION_TIME=2h
```

### 🧰 Tools and technologies
- [MongoDB Atlas](https://www.mongodb.com/atlas): A cloud-based fully managed database-as-a-service for MongoDB.
- [Mongoose](https://mongoosejs.com): An ODM library that creates a connection between MongoDB and Node.js.
- [Node](https://nodejs.org): An open-source, cross-platform JavaScript runtime environment.
- [Express](https://expressjs.com): A web framework for Node.js that makes building web applications and APIs easier.
- [React](https://react.dev): A JavaScript library for building user interfaces using reusable components.
- [Zod](https://zod.dev): A TypeScript-first schema validation library with a focus on developer experience.
- [Axios](https://axios-http.com): A promise based HTTP client for the browser and Node.js.
- [RxJS](https://rxjs.dev): Reactive programming library for JavaScript.
- [Json Web Tokens](https://jwt.io): A standard for securely transmitting information between parties as a JSON object.
- [Jest](https://jestjs.io): A delightful JavaScript testing framework.
- [Supertest](https://github.com/ladjs/supertest): A Node.js library for testing APIs.
- [Swagger](https://swagger.io): A set of tools used to generate documentation for REST APIs.
- [Recharts](https://recharts.org): A composable charting library for building declarative and reusable charts.
