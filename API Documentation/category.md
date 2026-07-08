# Categories API (`/api/category`)

## 1. Get All Categories
- **Endpoint:** `GET /api/category`
- **Description:** Fetch all gear categories available on the platform.
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Categories fetched successfully",
    "data": [
        {
            "id": "faf4719a-f4ed-47bf-a659-3a416bf1585e",
            "name": "Cycling",
            "description": "Bicycles and cycling accessories.",
            "image": "https://images.unsplash.com/photo-1517649763962-0c623066013b",
            "createdAt": "2026-07-06T14:18:17.485Z",
            "updatedAt": "2026-07-06T14:18:17.485Z"
        },
        {
            "id": "a9fd1fcb-6e99-43bb-9edf-9753ddd227b5",
            "name": "Camping",
            "description": "Camping tents and outdoor equipment.",
            "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            "createdAt": "2026-07-06T14:18:17.485Z",
            "updatedAt": "2026-07-06T14:18:17.485Z"
        },
    ]
  }
  ```
- **Possible Errors:**
  - `500 Internal Server Error`

## 2. Create Category
- **Endpoint:** `POST /api/category/create-category`
- **Description:** Create a new gear category. (Requires Admin Auth)
- **Request Body:**
  ```json
  {
    "name" : "SkyDivingPart2",
    "description" : "Something related to skydiving",
    "image" : "category image link"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Category created successfully",
    "data": {
        "id": "ae88d992-4971-4251-a19a-5625534bd3b0",
        "name": "SkyDivingPart2",
        "description": "Something related to skydiving",
        "image": "category image link",
        "createdAt": "2026-07-08T05:58:43.224Z",
        "updatedAt": "2026-07-08T05:58:43.224Z"
    }
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden` (e.g., Not admin)
  ```json
  {
    "success": false,
    "statusCode": 403,
    "message": "You are not authorized to access this resource.",
    "data": {}
  }
  ```
  - `400 Bad Request` (e.g., Validation error)
  ```json
  {
    "success": false,
    "statusCode": 400,
    "message": "Name and description are required.",
    "data": {}
  }
  ```
## 3. Delete Category
- **Endpoint:** `DELETE /api/category/delete-category/:id`
- **Description:** Delete an existing gear category. (Requires Admin Auth)
- **Request Body:** None
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Category deleted successfully",
    "data": {
        "id": "ae88d992-4971-4251-a19a-5625534bd3b0",
        "name": "SkyDivingPart2",
        "description": "Something related to skydiving",
        "image": "category image link",
        "createdAt": "2026-07-08T05:58:43.224Z",
        "updatedAt": "2026-07-08T06:02:22.560Z"
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
  - `404 Not Found` (e.g., Category not found)
  ```json
  {
    "success": false,
    "statusCode": 404,
    "message": "Category not found",
    "data": {}
  }
  ```

## 4. Update Category
- **Endpoint:** `PUT /api/category/update-category/:id`
- **Description:** Update details of a specific gear category when no gears exist in it. (Requires Admin Auth)
- **Request Body:**
  ```json
  {
    "name" : "SkyDivingPart2",
    "description" : "Something related to skydiving",
    "image" : "category image link"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Category updated successfully",
    "data": {
        "id": "ae88d992-4971-4251-a19a-5625534bd3b0",
        "name": "SkyDivingPart2",
        "description": "Something related to skydiving",
        "image": "category image link",
        "createdAt": "2026-07-08T05:58:43.224Z",
        "updatedAt": "2026-07-08T06:02:22.560Z"
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
  - `400 Bad Request` (e.g., Gears exist in this category)
```json
  {
    "success": false,
    "statusCode": 400,
    "message": "Name is required or cannot be empty",
    "data": {}
 }
```
  - `404 Not Found` (e.g., Category not found)
```json
  {
    "success": false,
    "statusCode": 404,
    "message": "Category not found",
    "data": {}
  }
  ```
