from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session

from backend.database import get_db

from backend.user.schemas import User
from backend.user.validators import get_user_by_id

router = APIRouter()


async def update_online_status(
        current_user: User,
        is_online: bool,
        db: Session
):
    current_user.is_online = is_online
    db.add(current_user)
    db.commit()


@router.websocket("/ws/{user_id}")
async def websocket_endpoint(
        websocket: WebSocket,
        user_id: int,
        db: Session = Depends(get_db)
):
    await websocket.accept()
    curr_user = get_user_by_id(user_id, db)
    if curr_user:
        await update_online_status(curr_user, True, db)
    else:
        print("Something went wrong")

    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect as e:
        if e.code != 1001:
            await update_online_status(curr_user, False, db)
