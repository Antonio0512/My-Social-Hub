from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend import auth
from backend.database import get_db
from backend.user import schemas
from backend.user import views

router = APIRouter()


@router.post("/users", response_model=schemas.User)
def register(
        user_data: schemas.UserCreate,
        db: Session = Depends(get_db)
):
    try:
        user = views.register_user(user_data, db)
        return user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)


@router.post("/login", response_model=schemas.TokenResponse)
def login(
        user_data: schemas.UserLogin,
        db: Session = Depends(get_db)
):
    user = views.login_user(user_data.email, user_data.password, db)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token = auth.create_access_token(data={"sub": user.username})

    return {"access_token": access_token, "token_type": "bearer"}
