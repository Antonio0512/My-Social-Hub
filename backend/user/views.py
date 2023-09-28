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


def update_user(
        user_id: int,
        user_data: schemas.UserUpdate,
        current_user: schemas.User,
        db: Session
):
    target_user = validators.get_user_by_id(user_id, db)

    if current_user.id != target_user.id:
        raise HTTPException(status_code=403, detail="You are not authorized!")

    if user_data.email:
        existing_user = validators.get_user_by_email(user_data.email, db)
        if existing_user and existing_user.id != target_user.id:
            raise HTTPException(status_code=400, detail="Email already registered")

    if user_data.username:
        existing_user = validators.get_user_by_username(user_data.username, db)
        if existing_user and existing_user.id != target_user.id:
            raise HTTPException(status_code=400, detail="Username already registered")

    for field, value in user_data.model_dump().items():
        setattr(target_user, field, value)

    db.commit()
    db.refresh(target_user)

    return target_user


def get_one_user(
        user_id: int,
        db: Session
):
    return validators.get_user_by_id(user_id, db)


def get_users(query: str, db: Session):
    if query:
        return db.query(models.User).filter(models.User.username.ilike(f"%{query}%")).all()
    else:
        return db.query(models.User).all()
