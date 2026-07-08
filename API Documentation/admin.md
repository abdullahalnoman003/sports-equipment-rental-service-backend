# Admin Management API (`/api/admin`)
*(All admin endpoints require Admin Auth)*

## 1. Get All Users
- **Endpoint:** `GET /api/admin/users`
- **Description:** Fetch a list of all registered users (customers and providers).
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Users fetched successfully",
    "data": [
        {
            "id": "79d40d09-a22e-445c-b910-737f87ec0fb5",
            "name": "abdullah al noman",
            "email": "noman6@gmail.com",
            "role": "PROVIDER",
            "createdAt": "2026-07-06T15:58:24.894Z",
            "status": "ACTIVE"
        },
    ]
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden`
  ```json
  {
    "success": false,
    "statusCode": 403,
    "message": "You are not authorized to access this resource.",
    "data": {}
  }
  ```

## 2. Update User Status
- **Endpoint:** `PATCH /api/admin/users/:id`
- **Description:** Update the status of a user (e.g., suspend or activate).
- **Request Body:**
  ```json
  {
    "status": "ACTIVE" 
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User updated successfully",
    "data": {
        "id": "79d40d09-a22e-445c-b910-737f87ec0fb5",
        "name": "abdullah al noman",
        "email": "noman6@gmail.com",
        "role": "PROVIDER",
        "createdAt": "2026-07-06T15:58:24.894Z",
        "status": "ACTIVE"
    }
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden`
  - `404 Not Found` (e.g., User not found)
  ```json
    {
    "success": false,
    "statusCode": 404,
    "message": "User not found",
    "data": {}
    }
  ```
  - `400 Bad Request`
  ```json
    {
    "success": false,
    "statusCode": 400,
    "message": "Invalid status value.",
    "data": {}
    }
  ```

## 3. Get All Gear (Platform-wide)
- **Endpoint:** `GET /api/admin/gear`
- **Description:** Fetch all gear listings across the platform.
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Gear fetched successfully",
    "data": [
        {
            "id": "d7f73e3d-899e-48ed-bf38-84704de2c32a",
            "name": "GTA V",
            "description": "This is Video game Updated",
            "image": "google.com",
            "brand": "Rockstar",
            "provider_email": "noman6@gmail.com",
            "price": 300,
            "quantity": 207,
            "createdAt": "2026-07-07T04:54:33.677Z",
            "updatedAt": "2026-07-07T07:38:39.683Z",
            "category_Name": "Other",
            "provider_id": "79d40d09-a22e-445c-b910-737f87ec0fb5"
        },
    ]
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden`

  ```json
  {
    "success": false,
    "statusCode": 401,
    "message": "Invalid or expired access token.",
    "data": {}
  }
  ```

## 4. Get All Rentals (Platform-wide)
- **Endpoint:** `GET /api/admin/rentals`
- **Description:** Fetch all rental orders across the platform.
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Rental orders fetched successfully",
    "data": [
        {
            "id": "f12b7dae-cc28-4b1e-be26-844256fa4b8c",
            "user_id": "7d598348-7462-4454-8140-3ea0956e7ab0",
            "gear_id": "d7f73e3d-899e-48ed-bf38-84704de2c32a",
            "start_date": "2026-07-08T00:00:00.000Z",
            "end_date": "2026-07-10T00:00:00.000Z",
            "status": "PLACED",
            "created_at": "2026-07-07T06:09:33.505Z",
            "updated_at": "2026-07-07T06:09:33.505Z",
            "total_price": 600,
            "user": {
                "name": "noman",
                "email": "noman1@gmail.com"
            },
            "gear": {
                "id": "d7f73e3d-899e-48ed-bf38-84704de2c32a",
                "name": "GTA V",
                "description": "This is Video game Updated",
                "image": "google.com",
                "brand": "Rockstar",
                "provider_email": "noman6@gmail.com",
                "price": 300,
                "quantity": 207,
                "createdAt": "2026-07-07T04:54:33.677Z",
                "updatedAt": "2026-07-07T07:38:39.683Z",
                "category_Name": "Other",
                "provider_id": "79d40d09-a22e-445c-b910-737f87ec0fb5"
            }
        },
    ]
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden`

   ```json
  {
    "success": false,
    "statusCode": 401,
    "message": "Invalid or expired access token.",
    "data": {}
  }
  ```
