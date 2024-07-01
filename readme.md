# Project README

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Frontend Setup (Next.js)](#frontend-setup-nextjs)
6. [Backend Setup (NestJS)](#backend-setup-nestjs)
7. [API Endpoints](#api-endpoints)
8. [Frontend-Backend Integration](#frontend-backend-integration)
9. [Project Structure](#project-structure)
10. [Contributing](#contributing)
11. [License](#license)

## Project Overview

This project is a web application that allows users to manage tree data structures. It includes user authentication, tree data structure management, and secure communication between the frontend and backend.

## Features

- User authentication with JWT
- Create, update, delete, and view nodes in a tree data structure
- Save and retrieve entire tree structures
- Secure communication between Next.js frontend and NestJS backend
- Robust input validation and error handling

## Tech Stack

- **Frontend:** Next.js
- **Backend:** NestJS
- **Database:** MongoDB (or your preferred database)
- **Authentication:** JWT (JSON Web Token)
- **Styling:** Tailwind CSS (optional)

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js (>=14.x)
- npm or yarn
- MongoDB (or any other database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

### Frontend Setup (Next.js)

1. Create a `.env.local` file in the `frontend` directory and add your environment variables:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
   ```

2. Start the Next.js development server:

   ```bash
   npm run dev
   ```

### Backend Setup (NestJS)

1. Create a `.env` file in the `backend` directory and add your environment variables:

   ```env
   DATABASE_URL=mongodb://localhost:27017/your-database
   JWT_SECRET=your_jwt_secret
   ```

2. Start the NestJS development server:

   ```bash
   npm run start:dev
   ```

## API Endpoints

### User Authentication

- **Register User:** `POST /auth/register`
- **Login User:** `POST /auth/login`

### Tree Operations

- **Save Tree:** `POST /trees/:username`
- **Get Tree:** `GET /trees/:username`

## Frontend-Backend Integration

### API Utility Functions

- **Save Tree:**

  ```javascript
  import axios from 'axios';

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  export const saveTree = async (username, treeData) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/trees/${username}`, { username, tree: treeData });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data.message);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please try again later.');
    } else {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  };
  ```

- **Get Tree:**

  ```javascript
  import axios from 'axios';

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  export const getTree = async (username) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/trees/${username}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data.message);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please try again later.');
    } else {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  };
  ```

### Frontend Save Functionality

- **Tree Component:**

  ```jsx
  import { useState, useEffect } from 'react';
  import { saveTree, getTree } from '../api/tree';

  const TreeComponent = ({ username }) => {
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchTree = async () => {
        try {
          const data = await getTree(username);
          setTreeData(data.tree);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchTree();
    }, [username]);

    const handleSave = async () => {
      if (!treeData) return;
      try {
        await saveTree(username, treeData);
        alert('Tree saved successfully');
      } catch (err) {
        setError(err.message);
      }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div>
        <h1>Tree for {username}</h1>
        {/* Render tree data here */}
        <button onClick={handleSave}>Save Tree</button>
      </div>
    );
  };

  export default TreeComponent;
  ```

## Project Structure

```plaintext
Zenstreeai/
├── frontend/
│   ├── components/
│   │   └── TreeComponent.jsx
│   ├── pages/
│   ├── api/
│   │   └── tree.js
│   ├── .env.local
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── tree/
│   │   │   ├── dto/
│   │   │   │   └── create-tree.dto.ts
│   │   │   ├── tree.controller.ts
│   │   │   ├── tree.module.ts
│   │   │   └── tree.service.ts
│   ├── .env
│   └── package.json
├── .gitignore
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.