import os
import uuid
from typing import Union

from fastapi import UploadFile

UPLOAD_DIR = "media"


def save_image(upload_file: Union[UploadFile, str], folder: str):
    if upload_file is None:
        return ""

    directory_name = UPLOAD_DIR + "/" + folder

    filename = f"{str(uuid.uuid4())}_{upload_file.filename}"

    file_path = os.path.join(directory_name, filename)

    os.makedirs(directory_name, exist_ok=True)

    with open(file_path, "wb") as image_file:
        image_file.write(upload_file.file.read())

    return f"/{directory_name}/{filename}"
