# Zero-Knowledge Vault Backend – Developer Documentation

---

## Table of Contents

1. [Introduction](#1-introduction)  
2. [About the Project](#2-about-the-project)  
3. [Installation](#3-installation)  
4. [Usage](#4-usage)  
5. [Running Tests](#5-running-tests)  
6. [Compatibility](#6-compatibility)  
7. [Project Structure Overview](#7-project-structure-overview)  
8. [Security Design Notes](#8-security-design-notes)  
9. [Limitations](#9-limitations)  
10. [Project Support](#10-project-support)  
11. [License](#11-license)  

---

## 1. Introduction

This document explains the **technical and architectural details** of the Zero-Knowledge Vault Backend.  
It is written for **developers, reviewers, and DevOps planning**, not for end users.

The backend is designed to demonstrate how a **zero-knowledge password vault** can be implemented and tested **without any frontend**, using **Postman**.

---

## 2. About the Project

The Zero-Knowledge Vault Backend ensures that:

- The server **never sees user passwords**
- Only **encrypted vault data** is stored
- Access is controlled using:

  - Token-based authentication (dummy JWT)
  - Device-based authorization
  - Version-controlled updates

- All functionality is verified via API calls

This project currently represents **Sprint 1**, focusing only on backend logic and security validation.

---

## 3. Installation

### Prerequisites

You need the following installed on your system:

### Node.js

Download (LTS recommended):  
https://nodejs.org/en/download/

Verify installation:

```bash
node -v
npm -v
````

---

### Postman

Used for API testing:
[https://www.postman.com/downloads/](https://www.postman.com/downloads/)

---

### Install Dependencies

Open a terminal in the project root and run:

```bash
npm install
```

---

## 4. Usage

### Start the Backend Server

```bash
node src/app.js
```

You should see:

```
Server running on port 3000
```

---

### API Usage Flow (High Level)

1. Login using `/auth/login`
2. Receive a token
3. Upload encrypted vault data
4. Read vault data
5. Update vault with version check
6. Test device revocation and failure cases

All requests are made through **Postman**.

---

## 5. Running Tests

### Current Testing Approach

At this stage, testing is done using **Postman manual testing**, which includes:

* Valid request flows
* Invalid token scenarios
* Invalid device scenarios
* Version conflict scenarios
* Revoked device access checks

This approach was chosen to:

* Validate business logic early
* Demonstrate backend behavior clearly
* Prepare for frontend integration later

---

### Planned Testing (Future)

* Postman Collection tests
* Newman CLI for automated CI testing
* Jest for unit testing middleware and services

---

## 6. Compatibility

* **Node.js**: LTS versions (v18+ recommended)

* **Operating Systems**:

  * Windows
  * macOS
  * Linux

* **API Clients**:

  * Postman
  * Curl
  * Any HTTP client

No browser dependency exists at this stage.

---

## 7. Project Structure Overview

```
src/
│
├── app.js                 → App entry point
│
├── routes/                → API endpoints
│   ├── auth.routes.js
│   ├── vault.routes.js
│   ├── device.routes.js
│   └── health.route.js
│
├── middleware/            → Security & validation
│   ├── auth.middleware.js
│   ├── device.middleware.js
│   ├── rateLimit.middleware.js
│   └── error.middleware.js
│
├── services/              → Business logic
│   └── auth.service.js
│
└── storage/               → In-memory storage
    ├── memory.store.js
    └── device.store.js
```

---

## 8. Security Design Notes

* Passwords are **never transmitted or stored**
* Vault data is **already encrypted before reaching backend**
* Backend stores only encrypted blobs
* Device-based authorization adds an extra security layer
* Version control prevents data overwrite conflicts
* Failure cases are intentional and demonstrable

---

## 9. Limitations

Current limitations (Sprint 1):

* No database (data resets on restart)
* Dummy JWT tokens
* Simulated encryption
* No frontend integration
* No automated test pipeline yet

These are **known and intentional**, based on sprint scope.

---

## 10. Project Support

For questions, issues, or improvements:

* Raise GitHub issues
* Discuss changes during sprint review
* Extend documentation as features evolve

This project is actively developed as part of an academic sprint.

---

## 11. License

This project is licensed under the **MIT License**.

You are free to:

* Use
* Modify
* Distribute

With proper attribution.
