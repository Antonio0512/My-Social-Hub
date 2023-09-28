from sqlalchemy.orm import Session
from fastapi import HTTPException

from backend import auth
from backend.user import models, schemas, validators, security


def register_user(
        user_data: schemas.UserCreate,
        db: Session
):
    try:
        validators.validate_unique_username(user_data.username, db)
        validators.validate_unique_email(user_data.email, db)
        validators.validate_equal_passwords(user_data.password, user_data.password2)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    hashed_password = security.get_password_hash(user_data.password)

    new_user = models.User(
        username=user_data.username,
        email=user_data.email,
        password=hashed_password,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(
        email: str,
        password: str,
        db: Session
):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return None
    if not auth.verify_password(password, user.password):
        return None

    return user


def get_one_user(
        user_id: int,
        db: Session
):
    return _get_user_by_id(user_id, db)


def get_users(query: str, db: Session):
    if query:
        return db.query(models.User).filter(models.User.username.ilike(f"%{query}%")).all()
    else:
        return db.query(models.User).all()


def _get_user_by_id(
        user_id: int,
        db: Session
):
    if user_id < 0:
        raise HTTPException(status_code=400, detail="User ID must be a positive number")

    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
