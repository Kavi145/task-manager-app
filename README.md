# task-manager-app
This is a full-stack Task Manager app built as part of my Python Developer Intern assessment. The goal was to build a secure, lightweight, and completely functional system where users can log in and manage their daily tasks effortlessly. I focused on keeping the code clean, fast, and organized so it's easy to read and review.

# Simple Task Manager Application

Hey there! Welcome to my Task Manager web app.

The main goal was to create a clean, functional application where a user can sign up, log in, and securely manage their daily tasks without their data mixing up with anyone else.

I kept the backend code organized into separate files to make it clean and highly readable, and paired it with a simple, responsive frontend dashboard.


## Features Built-In
-- Secure User Sessions: Registration and login endpoints powered by JWT token authentication. Passwords are safe and hashed locally using Python's native cryptographic hashing to ensure flawless cross-platform performance.

-- Complete Task CRUD: Authenticated users can create tasks, view them on a personal board, look up details, toggle completion status, and delete old tasks.

-- Smart Filtering and Pages: Built-in backend support for loading tasks in chunks (pagination) and filtering items instantly by status, such as pending vs. completed.

-- No-Fuss UI: A straightforward, clean frontend dashboard made using standard HTML, CSS, and vanilla JavaScript that links straight to the backend server API.


## Tech Stack
- Backend Framework: FastAPI and Pydantic
- Database and ORM: SQLite with SQLAlchemy Core
- Testing Engine: Automated endpoint testing via pytest
- Containerization: Standardized deployment instructions using a Dockerfile


## How to Run This Project Locally

### 1. Set Up the Backend
Open your terminal window, move inside the backend workspace, and turn on your Python virtual environment:

cd backend
.\venv\Scripts\Activate.ps1

Install the project dependencies:

pip install -r requirements.txt

Create your local environment configuration file by making a copy of the blueprint template:

cp .env.example .env


Now, launch the development server engine:

python -m uvicorn app.main:app --reload

You can now open your browser and interact with the live API sandbox at http://127.0.0.1:8000/docs.

### 2. Launch the Frontend UI
To see and play with the actual web dashboard, simply navigate to your local frontend directory using your file manager and double-click the index.html file to open it instantly in any regular web browser!


here is the live link for test!!!
https://task-manager-app-1-ea0m.onrender.com
