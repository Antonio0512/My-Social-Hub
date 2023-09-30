from datetime import datetime

from sqlalchemy.orm import Session
from backend.post.models import Post
from backend.user.schemas import User


def create_post(
        content: str,
        image_path: str,
        current_user: User,
        db: Session
):
    creation_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(str(creation_date))
    post = Post(content=content, image_url=image_path, creation_date=str(creation_date), author_id=current_user.id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post
