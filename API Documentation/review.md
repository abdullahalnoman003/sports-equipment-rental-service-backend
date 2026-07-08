# Reviews API (`/api/review`)

## 1. Submit Review
- **Endpoint:** `POST /api/review`
- **Description:** Submit a single review and rating for a rented gear item after returning it. (Requires Customer Auth)
- **Request Body:**
  ```json
  {
    "rentalId": "7cf93cc2-e369-45e7-8601-f6b2f643bc2f",
    "comment" : "This is better",
    "rating" : 2
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Review submitted successfully",
    "data": {
        "id": "e9635557-0718-4f6a-a864-cb54f8e73535",
        "user_id": "5db32533-3ffe-4628-a22c-e230156bfd88",
        "gear_id": "cbac6b68-25ca-4d12-9dc3-8c8fd606672f",
        "rating": 2,
        "comment": "This is better",
        "created_at": "2026-07-08T06:57:38.783Z",
        "updated_at": "2026-07-08T06:57:38.783Z"
    }
  }
  ```
- **Possible Errors:**
  - `401 Unauthorized` / `403 Forbidden`
  ```json
  {
    "success": false,
    "statusCode": 403,
    "message": "You are not authorized to review this rental",
    "data": {}
  }
  ```
  - `400 Bad Request` (e.g., Item not rented or not returned already reviewed)
  ```json
  {
    "success": false,
    "statusCode": 400,
    "message": "You can only review a rental after it has been returned",
    "data": {}
  }
  ```
