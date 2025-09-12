# Pratyogita - MCQ Test Platform

A desktop-first online MCQ test platform built with React, Material UI.

# Setup Guide
## Repository Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rudraksh2705/Pratyogita-.git
   ```
2. Navigate to the project directory:
   ```bash  
    cd pratyogita
    ```
3. Install dependencies:
    ```bash  
      npm install
      ```
4. Start the development server:
    ```bash
      npm run dev
      ```
The application will be available at `http://localhost:5173`.

## Environment Variables
Create a `.env` file in the root directory of the project and add the following environment variables:

```env
VITE_GOOGLE_CLIENT_ID=<Your Client ID>    
```

### Steps to get Google Client ID
- Go to Google Cloud Console.
- In quick access menu, select `APIs & Services` > `Credentials` > `OAuth consent screen` > `Clients`.
- Now click on `Create Client`.
- Application type should be `Web Application`.
- Add `http://localhost:5173` in `Authorized JavaScript origins` (frontend URL).
- Add `http://localhost:3000` in `Authorized redirect URIs` (backend URL).
- Click on `Create`.
- Copy the `Client ID` and paste it in the `.env` file.