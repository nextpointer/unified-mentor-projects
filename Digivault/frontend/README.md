
# Digital Document Management System

## Overview

The **Digital Document Management System (DDMS)** aims to streamline the storage, sharing, and management of critical documents such as mark sheets, PAN cards, passports, and more in a secure, digital format. By integrating Aadhaar numbers for each citizen, it reduces the risk of losing important documents and cuts down on government overhead costs. Physical documents will eventually be phased out, offering a more efficient way of managing important information. The system supports document uploads, sharing, and user profile management, making it easier for users to handle their official documents digitally.

This system provides services across various domains, including education, healthcare, railroads, and others.

## Tech Stack

* **Frontend:** Vue.js
* **Backend:** Bun, Hono
* **Database:** SQLite

## Features

* **User Registration:** New users can register for the system.
* **OTP Verification:** Secure OTP-based login and authentication.
* **Login:** Registered users can log in to the system.
* **Upload Documents:** Users can upload important documents securely.
* **Update/Delete Documents:** Users can manage their uploaded documents.
* **Share Documents:** Users can share documents with other users.
* **My Profile:** Users can view and update their profiles.

## Installation

### Prerequisites

* **Bun**: Install Bun for backend development. You can install it using [Bun](https://bun.sh).
* **SQLite**: SQLite database for storing user information and documents.

### Clone Repository

   ```
   git clone https://github.com/nextpointer/unified-mentor-projects
   ```

### Frontend Installation

1. Go to the folder:

   ```
   cd unified-mentor-projects/Digivault/frontend
   ```

2. Install the dependencies:

   ```
   bun install
   ```

3. Start the development server:

   ```
   bun run dev
   ```

### Backend Installation

1. Go to the folder:

   ```
   cd unified-mentor-projects/Digivault/backend
   ```

2. Install Bun and its dependencies:

   ```bash
   bun install
   ```

3. Set up the database (SQLite):

   * Ensure SQLite is installed on your machine.
   * Set up the database schema by running the necessary migrations or scripts.

4. Start the server:

   ```bash
   bun run dev
   ```

### Database Setup

* The application uses **SQLite** for database management.
* Ensure the `database.sqlite` file is properly configured and resides in the `backend` directory.
* If necessary, run migrations to set up the tables for users, documents, etc.

## Usage

Once the application is running, you can access it via your browser:

1. Navigate to `http://localhost:3000` for the frontend.
2. Backend services are running at `http://localhost:5173`.

### User Flow:

1. **Register**: New users can create an account by entering their details.
2. **Verify OTP**: After registration, users will receive a one-time password (OTP) to verify their email or phone number.
3. **Login**: Once verified, users can log in using their credentials.
4. **Upload Documents**: After logging in, users can upload various documents (e.g., PAN card, mark sheets).
5. **Update/Delete Documents**: Users can manage their documents, updating or deleting them as needed.
6. **Share Documents**: Users can share documents with others securely.
7. **My Profile**: Users can view and edit their profile information.

## Security

* OTP-based authentication to ensure secure login.
* Sensitive data, such as documents, is stored securely in the database.
* All document sharing is protected and requires authorization.

