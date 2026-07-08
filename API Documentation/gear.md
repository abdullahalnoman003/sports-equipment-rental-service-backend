# Gear API (`/api/gear`)

## 1. Get All Gear
- **Endpoint:** `GET /api/gear/gear`
- **Description:** Fetch all available gear. Supports filtering by category, price, and brand.
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "All gear fetched successfully",
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
  - `404 Not Found` (e.g., No gear found)
  ```json
  {
    "success": false,
    "statusCode": 404,
    "message": "No gear found",
    "data": []
  }
  ```

## 2. Get Specific Gear Item
- **Endpoint:** `GET /api/gear/:id`
- **Description:** Fetch detailed information about a specific gear item.
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Gear fetched successfully",
    "data": {
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
  }
  ```
- **Possible Errors:**
  - `404 Not Found` (e.g., Gear not found)
  ```json
  {
    "success": false,
    "statusCode": 404,
    "message": "Failed to fetch gear by id",
    "data": {}
  }
  ```
