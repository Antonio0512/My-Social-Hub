from sqlalchemy.orm import Session

from backend.models.user import User


def get_user_by_username(username: str, db: Session):
    return db.query(User).filter(User.username == username).first()


def get_user_by_email(email: str, db: Session):
    return db.query(User).filter(User.email == email).first()


def create_user(email, password, db: Session):
    user = User(email, password)

    db.add(user)
    db.commit()
    db.refresh(user)

    return user
