from datetime import datetime

from sqlalchemy import desc
from sqlalchemy.orm import Session
from backend.post.models import Post
from backend.user import schemas, models


def create_post(
        content: str,
        post_picture_path: str,
        current_user: schemas.User,
        db: Session
):
    creation_date = datetime.utcnow()
    post = Post(content=content, image_url=post_picture_path, creation_date=str(creation_date),
                author_id=current_user.id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


def get_posts_with_author(
        db: Session,
        column_name
):
    posts = db.query(Post, models.User) \
        .join(models.User, models.User.id == Post.author_id) \
        .order_by(desc(column_name)) \
        .all()

    post_responses = []
    for post, author in posts:
        post_responses.append({
            "id": post.id,
            "content": post.content,
            "image_url": post.image_url,
            "creation_date": post.creation_date,
            "author": {
                "id": author.id,
                "username": author.username,
                "email": author.email,
                "full_name": author.full_name,
                "bio": author.bio,
                "current_city": author.current_city,
                "birth_place": author.birth_place,
                "relationship_status": author.relationship_status,
                "profile_picture": author.profile_picture,
                "cover_picture": author.cover_picture,
            }
        })

    return post_responses


def get_user_posts_with_author(
        user_id: int,
        db: Session,
        column_name
):
    user_posts = db.query(Post, models.User) \
        .join(models.User, models.User.id == Post.author_id) \
        .filter(Post.author_id == user_id) \
        .order_by(desc(column_name)) \
        .all()

    post_responses = []
    for post, author in user_posts:
        post_responses.append({
            "id": post.id,
            "content": post.content,
            "image_url": post.image_url,
            "creation_date": post.creation_date,
            "author": {
                "id": author.id,
                "username": author.username,
                "email": author.email,
                "full_name": author.full_name,
                "bio": author.bio,
                "current_city": author.current_city,
                "birth_place": author.birth_place,
                "relationship_status": author.relationship_status,
                "profile_picture": author.profile_picture,
                "cover_picture": author.cover_picture,
            }
        })

    return post_responses
