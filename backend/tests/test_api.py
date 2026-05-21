import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.database import Base, get_db

# Create localized testing environment
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_user_registration_and_login():
    # Registration Test
    reg_response = client.post("/register", json={"username": "testuser", "password": "password123"})
    assert reg_response.status_code == 201
    assert reg_response.json()["username"] == "testuser"

    # Login Test
    login_response = client.post("/login", data={"username": "testuser", "password": "password123"})
    assert login_response.status_code == 200
    assert "access_token" in login_response.json()