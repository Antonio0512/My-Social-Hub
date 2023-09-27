from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

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
        user = views.register_user(db, user_data)
        return user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
