import os
from datetime import datetime, timedelta

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jwt import ExpiredSignatureError, DecodeError
from passlib.context import CryptContext
import jwt

from typing import Optional

from sqlalchemy.orm import Session

from backend.database import get_db
from backend.user.models import User

SECRET_KEY = os.environ.get("SECRET")
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=120)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login/")


def get_current_user(
        token: str = Depends(oauth2_scheme),
        db: Session = Depends(get_db),
):
    try:
        payload = jwt.decode(token, os.environ.get("SECRET"), algorithms=["HS256"])
        email: str = payload.get("sub")

        if email is None:
            raise HTTPException(status_code=401, detail="Could not validate credentials")

        user = db.query(User).filter(User.email == email).first()

        if user is None:
            raise HTTPException(status_code=401, detail="User not found")

        return user
    except ExpiredSignatureError as e:
        raise HTTPException(status_code=401, detail="JWT token expired: " + str(e))
    except DecodeError as e:
        raise HTTPException(status_code=401, detail="JWT token decoding error: " + str(e))
    except Exception:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
