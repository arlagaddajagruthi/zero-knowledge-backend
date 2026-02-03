Zero-Knowledge Vault Backend (Postman Guide)

This backend is built to test a zero-knowledge password vault system.
All features can be tested without any frontend, using Postman.

You do not need deep backend knowledge to try this.
Follow the steps below in order.

Prerequisites

Before starting, install the following:

#Node.js

Node.js is required to run the backend server.

->Download Node.js (LTS version recommended):
https://nodejs.org/en/download/

After installation, verify:

node -v
npm -v

#Postman

Postman is used to test APIs without a frontend.

Download Postman:
https://www.postman.com/downloads/

Running the Backend

Open terminal in the project folder

Install dependencies:

npm install


Start the server:

node src/app.js


You should see:

Server running on port 3000

How this backend works (in simple words)

The backend never sees real passwords

It only stores encrypted vault data

Access is controlled using:

A token (simulated JWT)

A device ID (to simulate trusted devices)

All data is stored in memory (no database yet)

Step-by-Step Postman Testing Guide
1️.Login (Get access token)

Request

Method: POST

URL:

http://localhost:3000/auth/login


Headers

Content-Type: application/json
x-device-id: device-123


Body (raw → JSON)

{
  "username": "testuser",
  "proof": "dummy-proof"
}


Expected response

{
  "message": "Login successful",
  "token": "dummy-jwt-token"
}


->Save the token (dummy-jwt-token) — you’ll use it for all next requests.

2️. Upload encrypted vault data

Request

Method: POST

URL:

http://localhost:3000/vault/upload


Headers

Authorization: Bearer dummy-jwt-token
x-device-id: device-123
Content-Type: application/json


Body

{
  "encryptedVault": "ENCRYPTED_DATA_ABC123=="
}


Expected response

{
  "message": "Vault data saved",
  "version": 1
}

3️. Read vault data

Request
Method: GET
URL:

http://localhost:3000/vault/data

Headers:
Authorization: Bearer dummy-jwt-token
x-device-id: device-123


Expected response

{
  "encryptedVault": "ENCRYPTED_DATA_ABC123==",
  "version": 1
}

4️.Update vault (with version check)

This prevents overwriting newer data accidentally.

Request

Method: POST

URL:

http://localhost:3000/vault/update

Headers:
Authorization: Bearer dummy-jwt-token
x-device-id: device-123
Content-Type: application/json

Body:

{
  "encryptedVault": "DATA_V2",
  "version": 1
}

Expected success:

{
  "message": "Vault updated",
  "version": 2
}

FAIL: Version conflict example (expected failure)
If you send an old version number:

Body:

{
  "encryptedVault": "DATA_V3",
  "version": 1
}

Response:

{
  "error": "Version conflict",
  "currentVersion": 2
}

5️.Device-based access control

The backend checks which device is accessing the vault.
Try with wrong device
Header:
x-device-id: device-999

Expected
{
  "error": "Device not authorized"
}

6️. Revoke a device (security test)

Once a device is revoked, it cannot access vault data anymore.
After revocation:
Any request with:
x-device-id: device-123

Will return:
{
  "error": "Device access revoked"
}

This proves device-level security works.

Common failure cases (for demonstration)
Scenario	Result
Missing token	401 Unauthorized
Wrong token	403 Forbidden
Wrong device ID	403 Forbidden
Revoked device	403 Forbidden
Vault empty	404 Vault is empty
Version mismatch	409 Conflict

These failures are intentional and show backend security behavior.

#Current limitations

No database (data resets when server restarts)
Encryption is simulated
Token is a dummy token
This is Sprint 1 backend only

#Next planned improvements (Sprint 2)

Real JWT authentication
Database integration
Real encryption logic
Frontend integration
Rate limiting & logging

#Summary

This backend demonstrates:
Zero-knowledge data handling
Token-based authentication
Device-based security
Version-controlled updates
Secure failure handling
All features are verified using Postman before frontend integration.
