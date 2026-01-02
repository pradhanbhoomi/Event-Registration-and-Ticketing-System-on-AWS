# Event-Registration-and-Ticketing-System-on-AWS
# 🎟️ Event Ticketing Platform (QR-Based Entry System)

A modern, cloud-native **event management and ticketing platform** that allows organizers to manage events and validate tickets using **QR codes**, while attendees can register for events and receive scannable tickets.
The system is built using **AWS serverless architecture** with a **secure, scalable frontend** deployed via **S3 + CloudFront**.

## 🚀 Live Deployment

### Frontend

* **CloudFront (Primary – HTTPS):**
  [https://d3hvd29pt77qsg.cloudfront.net](https://d3hvd29pt77qsg.cloudfront.net)
* **S3 Website Endpoint (Fallback):**
  [http://event-platform-frontend.s3-website.ap-south-1.amazonaws.com](http://event-platform-frontend.s3-website.ap-south-1.amazonaws.com)

### Backend (API Gateway – ap-south-1)

* **Base URL:**
  [https://6le445lnbf.execute-api.ap-south-1.amazonaws.com/dev](https://6le445lnbf.execute-api.ap-south-1.amazonaws.com/dev)


## 📌 API Endpoints

### Get Available Events

```
GET /events
```

**Full URL**

```
https://6le445lnbf.execute-api.ap-south-1.amazonaws.com/dev/events
```

**Response (example):**

```json
[
  {
    "eventId": "evt123",
    "name": "Music Fest",
    "date": "2026-01-15"
  }
]
```

### Register for an Event

```
POST /register
```

**Full URL**

```
https://6le445lnbf.execute-api.ap-south-1.amazonaws.com/dev/register
```

**Request Body**

```json
{
  "email": "user@example.com",
  "eventId": "evt123"
}
```

**Response**

```json
{
  "message": "Registration successful",
  "qrData": "evt123|user@example.com"
}
```

## 🧱 System Architecture

### High-Level Architecture

```
User Browser
   |
   v
CloudFront (CDN + HTTPS)
   |
   v
Amazon S3 (Static Frontend)
   |
   v
API Gateway (REST API)
   |
   v
AWS Lambda (Business Logic)
   |
   v
DynamoDB (Events & Registrations)
```

### Architecture Components

#### Frontend

* **HTML, CSS, JavaScript**
* Hosted on **Amazon S3**
* Distributed globally via **CloudFront**
* Netflix-style animated UI
* Role-based navigation (Organizer / Attendee)
* Live QR code generation & scanning

#### Backend

* **Amazon API Gateway**
* **AWS Lambda** (serverless compute)
* Handles:

  * Event listing
  * User registration
  * QR validation
* **CORS enabled** for CloudFront origin

#### Database

* **Amazon DynamoDB**
* Stores:

  * Event metadata
  * Attendee registrations
  * Ticket usage status (USED / UNUSED)

## 🎭 User Roles & Features

### 👤 Attendee

* View available events
* Register for an event
* Generate QR ticket
* Mobile-friendly ticket display

### 🧑‍💼 Organizer

* View registered attendees
* See ticket status (USED / UNUSED)
* Live QR scanner (camera-based)
* Real-time ticket validation dashboard

## 🔐 Security & Performance

* HTTPS via **CloudFront**
* AWS managed security protections enabled
* Serverless backend (no exposed servers)
* CloudFront caching for fast load times
* API access controlled via Gateway stages

## 🛠️ Tech Stack

**Frontend**

* HTML5
* CSS3 (Animations, Responsive UI)
* Vanilla JavaScript
* QRCode.js
* html5-qrcode

**Backend**

* AWS Lambda
* Amazon API Gateway (REST)
* Amazon DynamoDB

**Cloud & DevOps**

* Amazon S3
* Amazon CloudFront
* IAM
* AWS Region: **ap-south-1 (Mumbai)**

## 📂 Project Structure

```
event-platform-frontend/
│
├── index.html          # Landing page
├── login.html          # Login & role selection
├── attendee.html       # Attendee dashboard
├── organizer-dashboard.html
├── script.js           # Core frontend logic
├── styles.css          # UI & animations
└── assets/             # Icons, images
```

## 📦 Deployment Summary

* Frontend uploaded to **S3**
* Public access configured via bucket policy
* CloudFront distribution created and linked to S3 website origin
* Cache invalidation completed
* Backend deployed via API Gateway + Lambda
* End-to-end tested with live QR scanning
>>>>>>> 308bf1e (Add frontend source code and UI)
