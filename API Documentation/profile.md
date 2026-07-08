# Profile API (`/api/profile`)

## 1. Update Profile
- **Endpoint:** `PUT /api/profile/update-profile`
- **Description:** Update the authenticated user's profile information. (Requires Auth)
- **Request Body:**
  ```json
  {
    "name" : "noman",
    "profile_picture" : "Google.com",
    "phone_number" : "9689",
    "address" : "somewhere"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Profile updated successfully",
    "data": {
        "id": "7d598348-7462-4454-8140-3ea0956e7ab0",
        "name": "noman",
        "email": "noman1@gmail.com",
        "role": "CUSTOMER",
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
  - `401 Unauthorized` (e.g., Invalid or missing token)
  ```json
  {
    "success": false,
    "statusCode": 401,
    "message": "Invalid or expired access token.",
    "data": {}
  }
  ```
  - `400 Bad Request` (e.g., Validation error)

