
# FRAUDLENS

## Table of Contents
- [FRAUDLENS](#fraudlens)
  - [Table of Contents](#table-of-contents)
  - [Problem Statement](#problem-statement)
  - [Key Features](#key-features)
  - [Tech Stack](#tech-stack)
  - [Features Overview](#features-overview)
    - [Fraudulent Apps \& URLs](#fraudulent-apps--urls)
    - [30-Day Trend Analysis](#30-day-trend-analysis)
    - [User Authentication](#user-authentication)
  - [API Endpoints](#api-endpoints)
    - [`/api/fraud-data`](#apifraud-data)
    - [`/api/fraud-action`](#apifraud-action)
    - [`/api/fraud-trends`](#apifraud-trends)
  - [How to Run Locally](#how-to-run-locally)
  - [Screenshots](#screenshots)

## Problem Statement

Fraudulent apps and URLs pose significant security threats, leading to financial losses, data breaches, and compromised user trust. Organizations require a robust and intuitive fraud detection system to monitor and mitigate these risks effectively.


## Key Features

- **Real-time Fraud Monitoring**: Display all flagged fraudulent apps and URLs.
- **Data Visualization**: Graphs and charts for a 30-day fraud trend analysis.
- **User Management**: Login functionality with email and password authentication.
- **Actionable Insights**: Options to report, block, or investigate fraudulent entities.

## Tech Stack

The Fraud Detection Dashboard is built using the following technologies:

- **Frontend**: Next.js, ReactJS, Tailwind CSS for a responsive and user-friendly interface.
- **Backend**: Next.js server for handling authentication, API requests, and data processing.
- **Database**: MongoDB for storing and fetching fraud-related data.

## Features Overview

### Fraudulent Apps & URLs
The dashboard provides a detailed list of fraudulent apps and URLs, including their risk levels, categories, and reported dates. Users can take actions such as reporting, blocking, or investigating these entities.

### 30-Day Trend Analysis
Interactive charts display fraud trends over the past 30 days, helping users identify patterns and take proactive measures.

### User Authentication
A secure login mechanism ensures that only authorized users can access the dashboard. Roles such as Admin and Analyst are supported.

## API Endpoints

### `/api/fraud-data`
Fetches all fraudulent apps and URLs from the database.

### `/api/fraud-action`
Allows users to update the status of fraudulent entities (e.g., block, report, investigate).

### `/api/fraud-trends`
Provides aggregated fraud trend data for visualization.

## How to Run Locally

1. Clone the repository:
    ```bash
    git clone https://github.com/AbhishekNaik1112/FraudLens.git
    cd FraudLens
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables in a `.env` file:
    ```env
    NEXT_PUBLIC_GEMINI_API=your_gemini_api_key
    MONGODB_URI=your_mongodb_connection_string
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Access the application at `http://localhost:3000`.

6. To seed additional data, modify the `seed.ts` file located in the `api` folder. Once the database connection is properly configured, navigate to `http://localhost:3000/api/seed` to populate your database with the seeded data.

## Screenshots