from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import auth_routes, task_routes

# Initialize Database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Manager API", version="1.0.0")

# Critical for Frontend-Backend connection across deployments
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to specific URLs in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(auth_routes.router)
app.include_router(task_routes.router)

@app.get("/")
def root():
    return {"message": "Task Manager Backend is running cleanly. Go to /docs for interactive testing."}