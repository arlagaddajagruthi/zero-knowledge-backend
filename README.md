# Zero-Knowledge Vault Backend (Postman Guide)

This project is a **Sprint 1 backend prototype** for a zero-knowledge password vault system.

The backend **never sees real passwords**.  
Only encrypted vault data is stored.

All APIs can be tested **without any frontend** using :contentReference[oaicite:0]{index=0}.

You do **not** need deep backend knowledge to try this — just follow the steps below in order.

---

## Features

- Zero-knowledge data handling  
- Token-based authentication (dummy JWT for now)  
- Device-based access control  
- Version-controlled vault updates  
- Secure failure responses  
- In-memory storage (no database yet)

---

## Prerequisites

Before starting, install:

### 1. :contentReference[oaicite:1]{index=1}

Node.js is required to run the backend server.

Download (LTS recommended):

https://nodejs.org/en/download/

After installation, verify:

```bash
node -v
npm -v
````

---

### 2. Postman

Postman is used to test APIs without a frontend.

Download:

[https://www.postman.com/downloads/](https://www.postman.com/downloads/)

---

## Running the Backend

Open a terminal inside your project folder.

### Install dependencies

```bash
npm install
```

### Start the server

```bash
node src/app.js
```

You should see:

```
Server running on port 3000
```

---

## How This Backend Works (Simple Explanation)

* The backend **never receives real passwords**
* It only stores **encrypted vault blobs**
* Access is controlled using:

  * A token (simulated JWT)
  * A device ID (to simulate trusted devices)
* All data is stored **in memory**

---

# Step-by-Step Postman Testing Guide

---

## 1. Login (Get Access Token)

### Request

**Method**

```
POST
```

**URL**

```
http://localhost:3000/auth/login
```

### Headers

```
Content-Type: application/json
x-device-id: device-123
```

### Body (raw → JSON)

```json
{
  "username": "testuser",
  "proof": "dummy-proof"
}
```

### Expected Response

```json
{
  "message": "Login successful",
  "token": "dummy-jwt-token"
}
```

Save this token — you will use it for all next requests.

---

## 2. Upload Encrypted Vault Data

### Request

**Method**

```
POST
```

**URL**

```
http://localhost:3000/vault/upload
```

### Headers

```
Authorization: Bearer dummy-jwt-token
x-device-id: device-123
Content-Type: application/json
```

### Body

```json
{
  "encryptedVault": "ENCRYPTED_DATA_ABC123=="
}
```

### Expected Response

```json
{
  "message": "Vault data saved",
  "version": 1
}
```

---

## 3. Read Vault Data

### Request

**Method**

```
GET
```

**URL**

```
http://localhost:3000/vault/data
```

### Headers

```
Authorization: Bearer dummy-jwt-token
x-device-id: device-123
```

### Expected Response

```json
{
  "encryptedVault": "ENCRYPTED_DATA_ABC123==",
  "version": 1
}
```

---

## 4. Update Vault (With Version Check)

This prevents accidentally overwriting newer data.

### Request

**Method**

```
POST
```

**URL**

```
http://localhost:3000/vault/update
```

### Headers

```
Authorization: Bearer dummy-jwt-token
x-device-id: device-123
Content-Type: application/json
```

### Body

```json
{
  "encryptedVault": "DATA_V2",
  "version": 1
}
```

### Expected Success

```json
{
  "message": "Vault updated",
  "version": 2
}
```

---

### Version Conflict Example (Expected Failure)

If you send an old version:

```json
{
  "encryptedVault": "DATA_V3",
  "version": 1
}
```

Response:

```json
{
  "error": "Version conflict",
  "currentVersion": 2
}
```

---

## 5. Device-Based Access Control

Try using a wrong device:

```
x-device-id: device-999
```

Expected:

```json
{
  "error": "Device not authorized"
}
```

---

## 6. Revoke a Device (Security Test)

Once a device is revoked, it cannot access vault data anymore.

After revocation, any request with:

```
x-device-id: device-123
```

Returns:

```json
{
  "error": "Device access revoked"
}
```

This proves device-level security works.

---

## Common Failure Cases

| Scenario         | Result             |
| ---------------- | ------------------ |
| Missing token    | 401 Unauthorized   |
| Wrong token      | 403 Forbidden      |
| Wrong device ID  | 403 Forbidden      |
| Revoked device   | 403 Forbidden      |
| Vault empty      | 404 Vault is empty |
| Version mismatch | 409 Conflict       |

These failures are intentional and demonstrate backend security behavior.

---

## Current Limitations

* No database (data resets on restart)
* Encryption is simulated
* Token is a dummy token
* Sprint 1 backend only

---

## Next Planned Improvements (Sprint 2)

* Real JWT authentication
* Database integration
* Real encryption logic
* Frontend integration
* Rate limiting and logging

---

## Summary

This backend demonstrates:

* Zero-knowledge data handling
* Token-based authentication
* Device-based security
* Version-controlled updates
* Secure failure handling

All features are verified using Postman before frontend integration.


Just tell me.
```
