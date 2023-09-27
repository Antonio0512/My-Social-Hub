from sqlalchemy.orm import Session
from fastapi import HTTPException
from backend.user import models, schemas, validators, security

def register_user(db: Session, user_data: schemas.UserCreate):
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
