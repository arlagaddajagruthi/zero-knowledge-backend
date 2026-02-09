# Zero-Knowledge Vault Backend – Developer Documentation

This document explains **how the backend is structured**, **why each component exists**, and **how all parts work together**.
It is intended for developers, reviewers, and DevOps planning.

---

## 1. Project Goal

The goal of this backend is to demonstrate a **zero-knowledge password vault system**.

Key principles:

* The backend **never sees or stores passwords**
* Only **encrypted vault data** is handled
* Security is enforced using **tokens, device validation, and version control**
* All features are testable using **Postman only (no frontend required)**

---

## 2. Technology Stack

### Core Stack

* **Node.js** – Runtime
* **Express.js** – API framework
* **JavaScript (ES6)** – Language
* **Postman** – API testing

### Why this stack?

* Lightweight and fast to develop
* Easy to test APIs independently
* Suitable for microservices and DevOps pipelines
* Clear separation of concerns

---

## 3. High-Level Architecture

```
Client (Postman / Frontend)
        |
        v
   Express Routes
        |
        v
   Middleware Layer
        |
        v
   Services (Business Logic)
        |
        v
   In-Memory Storage
```

---

## 4. Folder Structure Overview

```
src/
│
├── app.js                 → Application entry point
│
├── routes/                → API endpoints
│   ├── auth.routes.js
│   ├── vault.routes.js
│   ├── device.routes.js
│   └── health.route.js
│
├── middleware/            → Security & validation layers
│   ├── auth.middleware.js
│   ├── device.middleware.js
│   ├── rateLimit.middleware.js
│   └── error.middleware.js
│
├── services/              → Business logic
│   └── auth.service.js
│
└── storage/               → In-memory data stores
    ├── memory.store.js
    └── device.store.js
```

---

## 5. Component Responsibilities

### 5.1 `app.js` – Application Entry Point

* Initializes Express server
* Enables CORS and JSON parsing
* Registers all route modules
* Registers global error handler
* Starts server on port `3000`

Purpose:

> Central configuration and application bootstrap.

---

## 6. Routes Layer (API Endpoints)

### 6.1 Authentication Routes – `auth.routes.js`

**Endpoint**

* `POST /auth/login`

Responsibilities:

* Accepts `username` and `proof`
* Verifies user without password
* Returns a dummy JWT token

Why:

> Simulates zero-knowledge authentication without exposing secrets.

---

### 6.2 Vault Routes – `vault.routes.js`

Endpoints:

* `POST /vault/upload`
* `GET /vault/data`
* `POST /vault/update`

Responsibilities:

* Stores only **encrypted vault blobs**
* Enforces version control
* Prevents accidental overwrites
* Blocks unauthorized or revoked devices

Why:

> Ensures data integrity and secure access to encrypted content.

---

### 6.3 Device Routes – `device.routes.js`

Endpoints:

* `POST /device/register`
* `POST /device/revoke`

Responsibilities:

* Registers trusted devices
* Revokes compromised devices
* Prevents revoked devices from accessing vault

Why:

> Adds device-level security beyond token authentication.

---

### 6.4 Health Route – `health.route.js`

Endpoint:

* `GET /health`

Responsibilities:

* Confirms backend availability
* Used for monitoring and DevOps readiness

---

## 7. Middleware Layer (Security & Validation)

### 7.1 Authentication Middleware – `auth.middleware.js`

* Validates Authorization header
* Blocks requests without valid token

Purpose:

> Ensures only authenticated users access protected routes.

---

### 7.2 Device Middleware – `device.middleware.js`

* Validates `x-device-id`
* Checks device revocation status

Purpose:

> Enforces trusted-device access.

---

### 7.3 Rate Limiting Middleware – `rateLimit.middleware.js`

* Limits number of requests per device
* Prevents abuse and brute-force attempts

Purpose:

> Protects backend stability.

---

### 7.4 Error Middleware – `error.middleware.js`

* Catches unhandled errors
* Returns consistent error responses

Purpose:

> Improves reliability and debugging.

---

## 8. Services Layer

### 8.1 Authentication Service – `auth.service.js`

Responsibilities:

* Handles authentication logic
* Generates dummy JWT token

Purpose:

> Keeps business logic separate from routes.

---

## 9. Storage Layer (Current Implementation)

### 9.1 `memory.store.js`

* Stores encrypted vault data
* Stores vault version

Note:

> Data resets on server restart (no database yet).

---

### 9.2 `device.store.js`

* Tracks registered devices
* Tracks revoked devices

Purpose:

> Enables device-level access control.

---

## 10. Security Design Decisions

* No plaintext passwords stored
* No encryption keys on server
* Token + device validation required
* Version control prevents race conditions
* Intentional failure cases implemented

---

## 11. Testing Strategy

### Current Testing

* Manual API testing via Postman
* Positive and negative test cases verified
* Failure scenarios intentionally demonstrated

### Planned Testing

* Postman Collections + Tests
* Newman CLI for CI pipelines
* Jest for unit testing (future)

---

## 12. Known Limitations (Sprint 1)

* In-memory storage only
* Dummy token authentication
* Simulated encryption
* No frontend integration yet

---

## 13. Future Enhancements

* Real JWT authentication
* Database integration (MongoDB / PostgreSQL)
* Proper encryption libraries
* Frontend integration
* CI/CD pipeline with automated tests

---

## 14. Summary

This backend demonstrates:

* Zero-knowledge architecture principles
* Secure API design
* Modular and scalable backend structure
* Clear separation of concerns
* DevOps-ready architecture
