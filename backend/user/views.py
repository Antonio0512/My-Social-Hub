from sqlalchemy.orm import Session
from fastapi import HTTPException

from backend import auth
from backend.user import models, schemas, validators, security


def register_user(user_data: schemas.UserCreate, db: Session):
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


def login_user(email: str, password: str, db: Session):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return None
    if not auth.verify_password(password, user.password):
        return None

    return user
