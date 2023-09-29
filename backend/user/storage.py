import os
import uuid
from fastapi import UploadFile

UPLOAD_DIR = "media"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_image(upload_file: UploadFile) -> str:
    filename = f"{str(uuid.uuid4())}_{upload_file.filename}"

    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as image_file:
        image_file.write(upload_file.file.read())

    return f"/{UPLOAD_DIR}/{filename}"
