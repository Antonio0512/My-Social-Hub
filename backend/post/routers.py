from typing import Union

from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session

from backend.post import schemas, views
from backend.user.schemas import User as Schema_user

from backend.auth import get_current_user
from backend.database import get_db

from backend.utils import save_image

router = APIRouter()


@router.post("/posts", response_model=schemas.PostResponse)
def add_post(
        content: str = Form(...),
        image: Union[UploadFile, str] = File(None),
        current_user: Schema_user = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    if isinstance(image, str):
        post_picture_path = image
    else:
        post_picture_path = save_image(image, "post_pics")

    post = views.create_post(
        content,
        post_picture_path,
        current_user,
        db
    )
    return post
