# Role-Based Access Management Control System

This project is a Role-Based Access Control (AuthMatrix) backend built with Express.js. It provides different routes that are accessible based on user roles, including routes for registration, login, and access for **admin**, **manager**, and **user** roles. The system uses JWT for authentication, bcryptjs for password hashing, and middleware for role authorization.

## Tech Stack

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **Nodemon**: Automatically restarts the server during development.
- **Helmet**: Enhances security by setting various HTTP headers.
- **Morgan**: HTTP request logger middleware.
- **jsonwebtoken**: To issue and verify JWT tokens.
- **dotenv**: Loads environment variables from `.env` file.
- **bcryptjs**: For password hashing.

### Prerequisites

**Node Version 20.x**

## Setup and Installation

### 1. Cloning the repository

```shell
git clone https://github.com/Mangesh636/rbac-backend.git
```

### 2. Install Packages

```shell
npm install
```

### 3. Setup DB URL

In `.env.local`:

```js
PORT = 5500;
DB_URI = "mongodb://localhost:27017/yourDatabaseName"; //MongoDB connection string
JWT_SECRET = your - secret;
```

### Start the app

```shell
npm start
```

## API Endpoints

### 1. Register

- Endpoint `/auth/register`
- Method `POST`
- Description Registers a new user with username, password, and role **(admin, manager, or user)**.
- Success `201 Created`
- Failure `500 Internal Server Error`

### 2. Login

- Endpoint `/auth/login`
- Method `POST`
- Description Logins an existing user with username, password **(admin, manager, or user)**.
- Success `200 OK`
- Failure `400 Bad Request`

### 3. Admin

- Endpoint `/admin`
- Method `GET`
- Accessible only by users with the **admin** role.
- Requires JWT verification and role authorization **(admin).**
- Success `200 OK`
- Failure `403 Forbidden`

### 4. Manager

- Endpoint `/manager`
- Method `GET`
- Accessible only by users with the **admin and manager** role.
- Requires JWT verification and role authorization **(admin and manager).**
- Success `200 OK`
- Failure `403 Forbidden`

### 3. User

- Endpoint `/user`
- Method `GET`
- Accessible only by users with the **admin, manager and user** role.
- Requires JWT verification and role authorization **(admin, manager and user).**
- Success `200 OK`
- Failure `403 Forbidden`

## Available Commands

Running commands with npm `npm [command]`

| Command   | Description                             |
| :-------- | :-------------------------------------- |
| `install` | Installs all dependencies               |
| `start`   | Starts a develpment instance of the app |
