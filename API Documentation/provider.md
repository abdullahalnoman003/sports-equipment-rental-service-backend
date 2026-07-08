# Provider Management API (`/api/provider`)
*(All provider endpoints require Provider Auth)*

## 1. Add Gear
- **Endpoint:** `POST /api/provider/gear`
- **Description:** Add a new gear item to the provider's inventory.
- **Request Body:**
  ```json
  {
    "name":"FOOTBALL Gloves",
    "description":"This is football gloves by nike",
    "image"  : "Pinterest.com",
    "price":500,
    "quantity":20,
    "brand": "NIKE",
    "category_name" : "Football"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Gear created successfully",
    "data": {
        "id": "b910373a-1551-42b1-bdfa-d0b7aea1bdce",
        "name": "FOOTBALL Gloves",
        "description": "This is football gloves by nike",
        "image": "Pinterest.com",
        "brand": "NIKE",
        "provider_email": "noman10@gmail.com",
        "price": 500,
        "quantity": 20,
        "createdAt": "2026-07-08T06:31:21.042Z",
        "updatedAt": "2026-07-08T06:31:21.042Z",
        "category_Name": "Football",
        "provider_id": "63688b87-a066-4c98-ac88-6322706fce21"
    }
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden`
  - `400 Bad Request` (e.g., Validation error)
  ```json
  {
    "success": false,
    "statusCode": 400,
    "message": "Invalid request.",
    "data": {}
  }
  ```


## 2. Update Gear
- **Endpoint:** `PUT /api/provider/gear/:id`
- **Description:** Update details of a specific gear item in the inventory.
- **Request Body:**
  ```json
  {
    "name": "GTA V",
    "description": "This is Video game Updated",
    "image": "google.com",
    "brand": "Rockstar",
    "price": 300,
    "quantity": 207,
    "category_name": "Other"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Gear updated successfully",
    "data": {
        "id": "b910373a-1551-42b1-bdfa-d0b7aea1bdce",
        "name": "GTA V",
        "description": "This is Video game Updated",
        "image": "google.com",
        "brand": "Rockstar",
        "provider_email": "noman10@gmail.com",
        "price": 300,
        "quantity": 207,
        "createdAt": "2026-07-08T06:31:21.042Z",
        "updatedAt": "2026-07-08T06:41:57.217Z",
        "category_Name": "Other",
        "provider_id": "63688b87-a066-4c98-ac88-6322706fce21"
    }
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden`
  ```json
  {
    "success": false,
    "statusCode": 403,
    "message": "You are not the owner of this gear",
    "data": {}
  }
  ```
  - `404 Not Found` (e.g., Gear not found)
  - `400 Bad Request`

## 3. Delete Gear
- **Endpoint:** `DELETE /api/provider/gear/:id`
- **Description:** Remove a gear item from the provider's inventory.
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Gear removed successfully"
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden`
  ```json
  {
    "success": false,
    "statusCode": 403,
    "message": "You are not the owner of this gear",
    "data": {}
  }
  ```
  - `404 Not Found` (e.g., Gear not found)
  ```json
  {
    "success": false,
    "statusCode": 404,
    "message": "Gear not found",
    "data": {}
  }
  ```

## 4. View Provider Orders
- **Endpoint:** `GET /api/provider/orders/`
- **Description:** View all incoming rental orders for the provider's gear.
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "All orders fetched successfully",
    "data": [
        {
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
                "quantity": 208,
                "createdAt": "2026-07-07T07:54:25.141Z",
                "updatedAt": "2026-07-08T06:22:58.430Z",
                "category_Name": "Tennis",
                "provider_id": "63688b87-a066-4c98-ac88-6322706fce21"
            },
            "user": {
                "name": "noman",
                "email": "noman2@gmail.com"
            },
            "payment": null
        },
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
            "gear": {
                "id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
                "name": "Tennis Ball",
                "description": "This is water High Quality Tennnisball",
                "image": null,
                "brand": "Tennis GO",
                "provider_email": "noman10@gmail.com",
                "price": 300,
                "quantity": 208,
                "createdAt": "2026-07-07T07:54:25.141Z",
                "updatedAt": "2026-07-08T06:22:58.430Z",
                "category_Name": "Tennis",
                "provider_id": "63688b87-a066-4c98-ac88-6322706fce21"
            },
            "user": {
                "name": "noman",
                "email": "noman2@gmail.com"
            },
            "payment": {
                "id": "2dac91f2-12bb-4a34-af8a-9a1ece53a998",
                "rental_id": "7cf93cc2-e369-45e7-8601-f6b2f643bc2f",
                "transaction_id": "cs_test_a1aZwDQZKzaMRoEOGwyQynH49gvt5njfleZ7ERMWTcseWIJtuIKwSHgeaj",
                "amount": 2100,
                "provider": "STRIPE",
                "status": "SUCCESS",
                "paid_at": "2026-07-08T06:29:10.886Z",
                "created_at": "2026-07-08T06:28:10.322Z",
                "customerId": "5db32533-3ffe-4628-a22c-e230156bfd88"
            }
        }
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

## 5. Update Order Status
- **Endpoint:** `PATCH /api/provider/orders/:id`
- **Description:** Update the status of a rental order (e.g., CONFIRMED, PICKED_UP, RETURNED).
- **Request Body:**
  ```json
  {
    "status" : "RETURNED"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Order updated successfully",
    "data": {
        "id": "9c64cb14-b589-45d6-ac8e-0e052777845b",
        "user_id": "5db32533-3ffe-4628-a22c-e230156bfd88",
        "gear_id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
        "start_date": "2026-07-08T00:00:00.000Z",
        "end_date": "2026-07-15T00:00:00.000Z",
        "status": "RETURNED",
        "created_at": "2026-07-08T06:22:57.493Z",
        "updated_at": "2026-07-08T06:46:22.135Z",
        "total_price": 2100
    }
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden`
  ```json
  {
    "success": false,
    "statusCode": 403,
    "message": "You are not authorized to update this order",
    "data": {}
  }
  ```
  - `404 Not Found` (e.g., Order not found)
  - `400 Bad Request`
  ```json
  {
    "success": false,
    "statusCode": 400,
    "message": "Invalid status value",
    "data": {}
  }
  ```
