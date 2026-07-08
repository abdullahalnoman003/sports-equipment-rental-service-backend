# Rental Orders API (`/api/rental`)

## 1. Create Rental Order
- **Endpoint:** `POST /api/rental/create-rental`
- **Description:** Create a new rental order for selected gear. (Requires Customer Auth)
- **Request Body:**
  ```json
  {
  "gear_id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
  "start_date": "2026-07-08",
  "end_date": "2026-07-15"
  }
  ```
- **Success Response:**

```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Rental created successfully",
    "data": {
        "id": "9c64cb14-b589-45d6-ac8e-0e052777845b",
        "user_id": "5db32533-3ffe-4628-a22c-e230156bfd88",
        "gear_id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
        "start_date": "2026-07-08T00:00:00.000Z",
        "end_date": "2026-07-15T00:00:00.000Z",
        "status": "PLACED",
        "created_at": "2026-07-08T06:22:57.493Z",
        "updated_at": "2026-07-08T06:22:57.493Z",
        "total_price": 2100,
        "gear": {
            "id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
            "name": "Tennis Ball",
            "description": "This is water High Quality Tennnisball",
            "image": null,
            "brand": "Tennis GO",
            "provider_email": "noman10@gmail.com",
            "price": 300,
            "quantity": 209,
            "createdAt": "2026-07-07T07:54:25.141Z",
            "updatedAt": "2026-07-07T13:45:49.979Z",
            "category_Name": "Tennis",
            "provider_id": "63688b87-a066-4c98-ac88-6322706fce21"
        },
        "user": {
            "id": "5db32533-3ffe-4628-a22c-e230156bfd88",
            "name": "noman",
            "email": "noman2@gmail.com"
        }
    }
  }
```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden`
  -`404 Not Found` (e.g., Gear not found)
  ```json
  {
    "success": false,
    "statusCode": 404,
    "message": "Gear item not found",
    "data": {}
  }
  ```
  - `400 Bad Request` (e.g., Gear not available for dates)

## 2. Get All Rentals
- **Endpoint:** `GET /api/rental/get-rentals`
- **Description:** Fetch all rental orders placed by the authenticated customer. (Requires Customer Auth)
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Rentals fetched successfully",
    "data": [
        {
            "id": "7cf93cc2-e369-45e7-8601-f6b2f643bc2f",
            "user_id": "5db32533-3ffe-4628-a22c-e230156bfd88",
            "gear_id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
            "start_date": "2026-07-08T00:00:00.000Z",
            "end_date": "2026-07-15T00:00:00.000Z",
            "status": "PAID",
            "created_at": "2026-07-07T13:45:49.765Z",
            "updated_at": "2026-07-08T06:29:11.128Z",
            "total_price": 2100,
            "user": {
                "id": "5db32533-3ffe-4628-a22c-e230156bfd88",
                "name": "noman",
                "email": "noman2@gmail.com",
                "status": "ACTIVE"
            },
            "gear": {
                "id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
                "name": "Tennis Ball",
                "description": "This is water High Quality Tennnisball",
                "image": null,
                "brand": "Tennis GO",
                "provider_email": "noman10@gmail.com",
                "price": 300,
                "quantity": 208,
                "category_Name": "Tennis",
                "provider_id": "63688b87-a066-4c98-ac88-6322706fce21"
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
    "statusCode": 403,
    "message": "You are not authorized to access this resource.",
    "data": {}
  }
  ```

## 3. Get Specific Rental
- **Endpoint:** `GET /api/rental/get-rentals/:id`
- **Description:** Fetch detailed information about a specific rental order. (Requires Customer Auth)
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Rental fetched successfully",
    "data": {
        "id": "7cf93cc2-e369-45e7-8601-f6b2f643bc2f",
        "user_id": "5db32533-3ffe-4628-a22c-e230156bfd88",
        "gear_id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
        "start_date": "2026-07-08T00:00:00.000Z",
        "end_date": "2026-07-15T00:00:00.000Z",
        "status": "PAID",
        "created_at": "2026-07-07T13:45:49.765Z",
        "updated_at": "2026-07-07T20:24:32.773Z",
        "total_price": 2100,
        "user": {
            "id": "5db32533-3ffe-4628-a22c-e230156bfd88",
            "name": "noman",
            "email": "noman2@gmail.com",
            "status": "ACTIVE"
        },
        "gear": {
            "id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
            "name": "Tennis Ball",
            "description": "This is water High Quality Tennnisball",
            "image": null,
            "brand": "Tennis GO",
            "provider_email": "noman10@gmail.com",
            "price": 300,
            "quantity": 209,
            "createdAt": "2026-07-07T07:54:25.141Z",
            "updatedAt": "2026-07-07T13:45:49.979Z",
            "category_Name": "Tennis",
            "provider_id": "63688b87-a066-4c98-ac88-6322706fce21"
        }
    }
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
  - `404 Not Found` (e.g., Rental order not found)
  ```json
  {
    "success": false,
    "statusCode": 404,
    "message": "Rental not found",
    "data": {}
  }

  ```
  
