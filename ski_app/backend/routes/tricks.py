# routes/tricks.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
import random

router = APIRouter()

# Modell für die Anfrage vom Frontend
class TrickSettings(BaseModel):
    withUnnaty: bool = False
    withInverted: bool = False
    minRot: int = 0
    maxRot: int = 10

# Beispiel-Trickliste
tricks_db = [
    {"name": "180 (safety tweaked)", "unnaty": False, "inverted": False, "rotations": 0.5},
    {"name": "SW 180 (tail)", "unnaty":False, "inverted": False, "rotations": 0.5},
    {"name": "UN 180 (critical)", "unnaty": True, "inverted": False, "rotations": 0.5},
    {"name": "UN SW 180 (shifty)", "unnaty":True, "inverted": False, "rotations": 0.5},
    {"name": "360 (mute)", "unnaty": False, "inverted": False, "rotations": 1},
    {"name": "SW 360 (lead cuban)", "unnaty":False, "inverted": False, "rotations": 1},
    {"name": "UN 360 (lead safety)", "unnaty": True, "inverted": False, "rotations": 1},
    {"name": "UN SW 360 (truck driver)", "unnaty":True, "inverted": False, "rotations": 1},
    {"name": "540 (seatbelt)", "unnaty":False, "inverted": False, "rotations": 1.5},
    {"name": "SW 540 (japan)", "unnaty":False, "inverted": False, "rotations": 1.5},
    {"name": "UN 540 (cuban)", "unnaty":True, "inverted": False, "rotations": 1.5},
    {"name": "UN SW 540 (safety tweaked)", "unnaty":True, "inverted": False, "rotations": 1.5},
    {"name": "On axis 720 (high safety)", "unnaty":False, "inverted": False, "rotations": 2},
    {"name": "UN on axis 720 (safety)", "unnaty":True, "inverted": False, "rotations": 2},
    {"name": "Cork 3 (blunt)", "unnaty":False, "inverted": True, "rotations": 1},
    {"name": "UN cork 3 (critical)", "unnaty":True, "inverted": True, "rotations": 1},
    {"name": "Cork 540 (japan)", "unnaty":False, "inverted": True, "rotations": 1.5},
    {"name": "SW Cork 540 (japan)", "unnaty":False, "inverted": True, "rotations": 1.5},
    {"name": "UN cork 540 (nose)", "unnaty":True, "inverted": True, "rotations": 1.5},
    {"name": "UN SW Cork 540 (mute)", "unnaty":True, "inverted": True, "rotations": 1.5},
    {"name": "Cork 720 (mute)", "unnaty":False, "inverted": True, "rotations": 2},
    {"name": "SW cork 720 (lead safety)", "unnaty":True, "inverted": True, "rotations": 2},
    {"name": "UN cork 720 (blunt)", "unnaty":True, "inverted": True, "rotations": 2},
    {"name": "SW UN cork 720 (true nose)", "unnaty":True, "inverted": True, "rotations": 2},
    {"name": "Cork 900 (japan)", "unnaty":False, "inverted": True, "rotations": 2.5},
    {"name": "SW cork 900 (safety)", "unnaty":False, "inverted": True, "rotations": 2.5},
    {"name": "UN cork 900 (critical)", "unnaty":True, "inverted": True, "rotations": 2.5},
    {"name": "SW UN cork 900 (stale fish)", "unnaty":True, "inverted": True, "rotations": 2.5},
    {"name": "Flatspin 360 (japan)", "unnaty":False, "inverted": True, "rotations": 1},
    {"name": "UN flatspin 360 (lead safety)", "unnaty":True, "inverted": True, "rotations": 1},
    {"name": "Flatspin 540 (bow and arrow)", "unnaty":False, "inverted": True, "rotations": 1.5},
    {"name": "UN flatspin 540 (japan)", "unnaty":True, "inverted": True, "rotations": 1.5},
    {"name": "Misty 540 (mute)", "unnaty":False, "inverted": True, "rotations": 1.5},
    {"name": "UN misty 540 (safety)", "unnaty":True, "inverted": True, "rotations": 1.5},
    {"name": "Misty 720 (lead mute)", "unnaty":False, "inverted": True, "rotations": 2},
    {"name": "SW misty 720 (japan)", "unnaty":False, "inverted": True, "rotations": 2},
    {"name": "UN misty 720 (truck driver)", "unnaty":True, "inverted": True, "rotations": 2},
    {"name": "SW UN misty 720 (lead safety)", "unnaty":True, "inverted": True, "rotations": 2},
    {"name": "SW misty 900 (blunt)", "unnaty":False, "inverted": True, "rotations": 2.5},
    {"name": "UN SW misty 900 (lead tail)", "unnaty":True, "inverted": True, "rotations": 2.5},
    {"name": "Backflip", "unnaty":False, "inverted": True, "rotations": 1},
    {"name": "Frontflip", "unnaty":False, "inverted": True, "rotations": 1},
    {"name": "Double backflip", "unnaty":False, "inverted": True, "rotations": 2},
    {"name": "Double frontflip", "unnaty":False, "inverted": True, "rotations": 2},
    {"name": "Double cork 720 (safety)", "unnaty":False, "inverted": True, "rotations": 2},
    {"name": "UN double cork 720 (safety)", "unnaty":True, "inverted": True, "rotations": 2},
    {"name": "Double cork 900 (safety)", "unnaty":False, "inverted": True, "rotations": 2.5},
    {"name": "UN double cork 900 (safety)", "unnaty":True, "inverted": True, "rotations": 2.5},
    {"name": "SW double cork 900 (japan)", "unnaty":False, "inverted": True, "rotations": 2.5},
    {"name": "UN SW double cork 900 (high safety)", "unnaty":True, "inverted": True, "rotations": 2.5},
    {"name": "Double cork 1080 (mute)", "unnaty":False, "inverted": True, "rotations": 3},
    {"name": "SW double cork 1080 (tail)", "unnaty":False, "inverted": True, "rotations": 3},
    {"name": "UN double cork 1080 (japan)", "unnaty":True, "inverted": True, "rotations": 3},
    {"name": "UN SW double cork 1080 (high safety)", "unnaty":True, "inverted": True, "rotations": 3},
    {"name": "Double cork 1260 (stale fish)", "unnaty":False, "inverted": True, "rotations": 3.5},
    {"name": "SW double cork 1260 (tweaked lead safety)", "unnaty":False, "inverted": True, "rotations": 3.5},
    {"name": "UN double cork 1260 (tail)", "unnaty":True, "inverted": True, "rotations": 3.5},
    {"name": "SW UN doublce cork 1260 (mute)", "unnaty":True, "inverted": True, "rotations": 3.5},
]

# POST-Route für gefilterte Tricks. Settings funktionieren nicht mehr 
@router.post("/get_trick")
def get_trick(settings: TrickSettings):
    filtered = [
        t for t in tricks_db
        if (not settings.withUnnaty or t["unnaty"]) and
           (not settings.withInverted or t["inverted"]) and
           (t["rotations"] >= settings.minRot and t["rotations"] <= settings.maxRot)
    ]
    if not filtered:
        return {"trick": None}
    trick = random.choice(filtered)
    return {"trick": trick}
