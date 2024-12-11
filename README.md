# Ampirial-Assessment
## Overview

Ampirial Assessment is a role-based web application developed as part of a submission for the Full Stack Intern role. The platform facilitates recruiters and candidates in managing offer letters, enabling recruiters to send offers and candidates to review and sign them. The application is built with a modern tech stack and adheres to best practices in both frontend and backend development.

## Project Structure

The project is organized into two main folders:

- client: Contains the frontend codebase built with React.js, ShadCN, and Tailwind CSS.

- server: Contains the backend codebase built with Node.js, Express, and TypeScript.

## Tech Stack

Frontend

- React.js: A JavaScript library for building user interfaces.

- ShadCN: A component library for consistent and accessible UI design.

- Tailwind CSS: A utility-first CSS framework for rapid UI development.

- TypeScript: A strongly typed superset of JavaScript.

## Backend

- Node.js: A JavaScript runtime for building scalable server-side applications.

- Express: A minimal and flexible Node.js web application framework.

- TypeScript: Ensures type safety and enhances code maintainability.

## Features

1. Role-Based Access:

Recruiters: Can create and send offer letters.

Candidates: Can view and sign offer letters.

2. Offer Management:

Recruiters can manage offers, including viewing offer details and statuses.

Candidates can sign offers electronically.

3. Dynamic UI:

Responsive and accessible design built with Tailwind CSS and ShadCN.

Interactive components with a clean and user-friendly interface.

Installation and Setup

## Prerequisites

Ensure the following are installed on your machine:

Node.js (v14 or higher)

npm or yarn

### Steps

Clone the repository:
```
git clone https://github.com/your-repo/Ampirial_Assessment.git
cd Ampirial_Assessment
```
Navigate to the client folder and install dependencies:
```
cd client
npm install
```
Navigate to the server folder and install dependencies:
```
cd server
npm install
```
Set up environment variables:

Create a .env file in the server folder with the following variables:
```
PORT=5001
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```
Start the development servers:

Frontend:

```
cd client
npm start
```
Backend:
```
cd server
nodemon server.js
```
Access the application at ```http://localhost:3000```.


## Future Enhancements
- Add notification features for offer status updates.
- Implement a dashboard with analytics for recruiters.
- Enhance security with role-based permissions and improved data encryption.
