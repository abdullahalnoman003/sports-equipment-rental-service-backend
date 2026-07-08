# Authentication API (`/api/auth`)

## 1. Register User
- **Endpoint:** `POST /api/auth/register`
- **Description:** Register a new user (Customer or Provider).
- **Request Body:**
  ```json
  {
    "name" : "abdullah al noman",
    "email": "noman2test@gmail.com",
    "password" : "thisisasecurepassword",
    "role" : "CUSTOMER"  // or PROVIDER , 
    }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": {
        "id": "64e1dc52-feff-4e2e-afea-7377451346e9",
        "name": "abdullah al noman",
        "email": "noman2test@gmail.com",
        "role": "CUSTOMER",
        "createdAt": "2026-07-08T05:32:19.598Z",
        "updatedAt": "2026-07-08T05:32:19.598Z",
        "status": "ACTIVE"
    }
  }
  ```
- **Possible Errors:**
  - `400 Bad Request` (e.g., Validation error)
  ```json
  {
    "success": false,
    "statusCode": 400,
    "message": "Name, email and password are required.",
    "data": {}
  }
  ```
  - `409 Conflict` (e.g., User already exists)
  ```json
  {
    "success": false,
    "statusCode": 409,
    "message": "User already exist",
    "data": {}
  }
  ```

## 2. Login User
- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticate a user and return a JWT access token.
- **Request Body:**
  ```json
  {
    "email": "noman1@gmail.com",
    "password": "thisisasecurepassword" 
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkNTk4MzQ4LTc0NjItNDQ1NC04MTQwLTNlYTA5NTZlN2FiMCIsImVtYWlsIjoibm9tYW4xQGdtYWlsLmNvbSIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTc4MzQ4ODk5MiwiZXhwIjoxNzgzNTc1MzkyfQ.5-XuUBqfuAzbXgAIulawpD2YGwOiYnp312uFeiUxQzs",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkNTk4MzQ4LTc0NjItNDQ1NC04MTQwLTNlYTA5NTZlN2FiMCIsImVtYWlsIjoibm9tYW4xQGdtYWlsLmNvbSIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTc4MzQ4ODk5MiwiZXhwIjoxNzg0MDkzNzkyfQ.-zBx9WbXhZ7C8wnQGxmm13-UE6FwBxDAM5ZciiGhTEI"
    }
  }
  ```

- **Possible Errors:**
  - `401 Unauthorized` (e.g., Invalid credentials)
  ```json
  {
    "success": false,
    "statusCode": 404,
    "message": "User not found",
    "data": {}
  }
  ```

  - `404 Not Found` (e.g., User not found)
```json
  {
    "success": false,
    "statusCode": 404,
    "message": "User not found",
    "data": {}
  }
```

## 3. Get Current User Profile
- **Endpoint:** `GET /api/auth/me`
- **Description:** Fetch the currently authenticated user's profile information. (Requires Auth)
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User profile fetched successfully",
    "data": {
        "id": "7d598348-7462-4454-8140-3ea0956e7ab0",
        "name": "noman",
        "email": "noman1@gmail.com",
        "role": "CUSTOMER",
        "createdAt": "2026-07-06T09:25:53.095Z",
        "updatedAt": "2026-07-08T04:44:24.299Z",
        "status": "ACTIVE",
        "profile": {
            "id": "7251f46e-1d45-46da-b508-7f848812a236",
            "profile_picture": "Google.com",
            "address": "somewhere",
            "phone_number": "9689",
            "createdAt": "2026-07-06T09:25:53.095Z",
            "updatedAt": "2026-07-08T04:44:24.299Z",
            "user_id": "7d598348-7462-4454-8140-3ea0956e7ab0"
        }
    }
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` (e.g., Missing or invalid token)
  ```json
  {
    "success": false,
    "statusCode": 401,
    "message": "Invalid or expired access token.",
    "data": {}
  }
```