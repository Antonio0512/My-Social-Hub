from fastapi import HTTPException
from sqlalchemy.orm import Session
from backend.user.models import User


def validate_unique_username(username: str, db: Session):
    existing_user = _get_user_by_username(username, db)
    if existing_user:
        raise ValueError("Username already taken")


def validate_unique_email(email: str, db: Session):
    existing_email = _get_user_by_email(email, db)
    if existing_email:
        raise ValueError("Email already registered")


def validate_equal_passwords(password: str, password2: str):
    if password != password2:
        raise ValueError("Passwords do not match")


def get_user_by_username(username: str, db: Session):
    return db.query(User).filter(User.username == username).first()


def get_user_by_email(email: str, db: Session):
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(
        user_id: int,
        db: Session
):
    if user_id < 0:
        raise HTTPException(status_code=400, detail="User ID must be a positive number")

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
