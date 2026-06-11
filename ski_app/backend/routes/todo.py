from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

# Modell
class Trick(BaseModel):
    name: str
    done: bool = False

# Speicher
tricks: List[Trick] = []

# GET /tricks
@router.get("/")
def get_tricks():
    return tricks

# POST /tricks
@router.post("/")
def add_trick(trick: Trick):
    tricks.append(trick)
    return trick

# PUT /tricks/{index}
@router.put("/{index}")
def toggle_trick(index: int):
    if 0 <= index < len(tricks):
        tricks[index].done = not tricks[index].done
        return tricks[index]
    return {"error": "Index out of range"}
