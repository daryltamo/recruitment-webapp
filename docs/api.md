# API Documentation for Recruitment Web App

## Overview

This document provides an overview of the API endpoints available in the Recruitment Web App. The API is built using Express.js and follows RESTful principles.

## Base URL

The base URL for all API endpoints is:

```
http://<your-server-address>:3000/api
```

## Authentication

All endpoints require authentication. Use the following method to obtain a token:

### Login

- **Endpoint:** `/auth/login`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

## Endpoints

### Candidature

- **Create a new application**

  - **Endpoint:** `/candidature`
  - **Method:** POST
  - **Headers:** `Authorization: Bearer <token>`
  - **Request Body:**
    ```json
    {
      "jobId": "123",
      "applicantId": "456",
      "resume": "link_to_resume"
    }
    ```
  - **Response:** 201 Created

- **Get all applications**
  - **Endpoint:** `/candidature`
  - **Method:** GET
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:**
    ```json
    [
      {
        "id": "1",
        "jobId": "123",
        "applicantId": "456",
        "status": "submitted"
      }
    ]
    ```

### Demande

- **Create a new request**
  - **Endpoint:** `/demande`
  - **Method:** POST
  - **Headers:** `Authorization: Bearer <token>`
  - **Request Body:**
    ```json
    {
      "title": "Request Title",
      "description": "Request Description"
    }
    ```
  - **Response:** 201 Created

### Offre d'Emploi

- **Get all job offers**
  - **Endpoint:** `/offreDemploi`
  - **Method:** GET
  - **Response:**
    ```json
    [
      {
        "id": "1",
        "title": "Job Title",
        "description": "Job Description"
      }
    ]
    ```

### Organisation

- **Get all organizations**
  - **Endpoint:** `/organisation`
  - **Method:** GET
  - **Response:**
    ```json
    [
      {
        "id": "1",
        "name": "Organization Name"
      }
    ]
    ```

## Error Handling

All responses will include a status code and a message. For example:

- **404 Not Found**
  ```json
  {
    "error": "Resource not found"
  }
  ```

## Conclusion

This API documentation provides a basic overview of the available endpoints and their usage. For further details, please refer to the source code or contact the development team.
