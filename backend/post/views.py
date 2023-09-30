from datetime import datetime

from sqlalchemy import desc
from sqlalchemy.orm import Session
from backend.post.models import Post
from backend.user.schemas import User


def create_post(
        content: str,
        post_picture_path: str,
        current_user: User,
        db: Session
):
    creation_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    post = Post(content=content, image_url=post_picture_path, creation_date=str(creation_date),
                author_id=current_user.id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


def get_posts(db: Session, column_name):
    return db.query(Post).order_by(desc(column_name)).all()


def get_post_author(
        post_id: int,
        db: Session
):
    post = db.query(Post).filter(Post.id == post_id).first()
    return post.author


def get_user_posts(
        user_id: int,
        db: Session
):
    return db.query(Post).filter(Post.author_id == user_id).all()