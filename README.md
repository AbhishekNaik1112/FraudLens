
# FRAUDLENS

## Deployed Link - https://fraudlens.vercel.app/

## Table of Contents
- [FRAUDLENS](#fraudlens)
  - [Deployed Link - https://fraudlens.vercel.app/](#deployed-link---httpsfraudlensvercelapp)
  - [Table of Contents](#table-of-contents)
  - [Problem Statement](#problem-statement)
  - [Key Features](#key-features)
  - [Tech Stack](#tech-stack)
  - [Features Overview](#features-overview)
    - [Fraudulent Apps \& URLs](#fraudulent-apps--urls)
    - [30-Day Trend Analysis](#30-day-trend-analysis)
    - [User Authentication](#user-authentication)
    - [AI Chatbot](#ai-chatbot)
  - [Screenshots](#screenshots)
  - [API Endpoints](#api-endpoints)
    - [`/api/fraud-data`](#apifraud-data)
    - [`/api/fraud-action`](#apifraud-action)
    - [`/api/fraud-trends`](#apifraud-trends)
  - [How to Run Locally](#how-to-run-locally)
  - [Contribution](#contribution)

## Problem Statement

Fraudulent apps and URLs pose significant security threats, leading to financial losses, data breaches, and compromised user trust. Organizations require a robust and intuitive fraud detection system to monitor and mitigate these risks effectively.


## Key Features

- **Real-time Fraud Monitoring**: Display all flagged fraudulent apps and URLs.
- **Data Visualization**: Graphs and charts for a 30-day fraud trend analysis.
- **User Management**: Login functionality with email and password authentication.
- **Actionable Insights**: Options to report, block, or investigate fraudulent entities.
- **AI Chatbot**: AI Chatbot to help you get summaries of existing data.

## Tech Stack

The Fraud Detection Dashboard is built using the following technologies:

- **Frontend**: Next.js, ReactJS, Tailwind CSS for a user-friendly interface, Zustand for State Management.
- **Backend**: Next.js server for handling authentication, API requests, and data processing.
- **Database**: MongoDB for storing and fetching fraud-related data.
- **Realtime Updates**: SWR.
- **AI Chatbot**: Gemini AI.

## Features Overview

### Fraudulent Apps & URLs
The dashboard provides a detailed list of fraudulent apps and URLs, including their risk levels, categories, and reported dates. Users can take actions such as reporting, blocking, or investigating these entities.

### 30-Day Trend Analysis
Interactive charts display fraud trends over the past 30 days, helping users identify patterns and take proactive measures.

### User Authentication
A secure login mechanism ensures that only authorized users can access the dashboard. Roles such as Admin and Analyst are supported.

### AI Chatbot
A chatbot which will allow analysts or admins get ask questions based on existing data.

## Screenshots

1. Landing Page - ![image](https://github.com/user-attachments/assets/c099a3ad-42f5-4379-afd4-c25ff92038cb)
2. Login Page - ![image](https://github.com/user-attachments/assets/388b2b5d-4ecd-4c18-b851-85c54f472ded)
3. Dashboard - ![image](https://github.com/user-attachments/assets/f71f98a2-9973-4506-b096-4aef45c4b887)
4. Real Time Analytics - ![{0836DF5C-7487-457F-A2F9-17395455F5A4}](https://github.com/user-attachments/assets/7eaaaa23-07c8-4f6e-ae3d-d8d1d8f7d1bc)
5. Chatbot - ![{F17DFAEE-D922-4BAD-A73B-92CE5086E063}](https://github.com/user-attachments/assets/16fe36ed-e42e-4d26-a16d-2653b80e0407)
6. Chatbot Usage Example - ![{CE7D03A3-9FDD-4D97-B169-748E93207461}](https://github.com/user-attachments/assets/c7427a5e-391e-4888-b517-6bf89cbe1dac)
7. Graph Analytics - ![{92E6EE28-7E45-46B1-9081-D2679C054525}](https://github.com/user-attachments/assets/4d00392e-8d71-4952-a716-a21bc60ee120)
8. Fraud Apps Section with Actions(Report, Block, Investigate) - ![image](https://github.com/user-attachments/assets/f2363307-eb5a-45f8-9df8-6eae0c597e8e)
9. Fraud URLs Section with Actions(Report, Block, Investigate) - ![image](https://github.com/user-attachments/assets/0d2cecc6-da00-455c-8e34-82b2b6e060e7)

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

3. Set up environment variables in a `.env.local` file:
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


## Contribution

We welcome contributions to improve FraudLens! Here's how you can contribute:

1. **Fork the Repository**: Click the "Fork" button at the top-right corner of the repository page.

2. **Clone Your Fork**:
    ```bash
    git clone https://github.com/AbhishekNaik1112/FraudLens.git
    cd FraudLens
    ```

3. **Create a Branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make Changes**: Implement your changes or fixes.

5. **Test Your Changes**: Ensure your changes work as expected and do not break existing functionality.

6. **Commit Your Changes**:
    ```bash
    git add .
    git commit -m "Add a brief description of your changes"
    ```

7. **Push to Your Fork**:
    ```bash
    git push origin feature/your-feature-name
    ```

8. **Create a Pull Request**: Go to the original repository, click "Pull Requests," and submit your pull request. Provide a clear description of your changes.
