from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
import bcrypt
from backend.validators import user_validator
from backend.config import get_db
from backend.schemas import user_schema
from backend.crud import user_crud

user_router = APIRouter()


@user_router.post("/users", response_model=user_schema.User, status_code=status.HTTP_201_CREATED)
def register_user(
        user_data: user_schema.UserCreate,
        db: Session = Depends(get_db)
):
    if not user_data:
        raise HTTPException(status_code=400, detail="User data is empty")

    try:
        user_validator.validate_unique_username(user_data.username, db)
        user_validator.validate_unique_email(user_data.email, db)
        user_validator.validate_equal_passwords(user_data.password, user_data.password2)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    hashed_password = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt())

    user = user_crud.create_user(user_data.email, hashed_password.decode('utf-8'), db)

    if user:
        return {
            "user": user
        }
