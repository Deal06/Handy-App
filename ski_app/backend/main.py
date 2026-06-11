from fastapi import FastAPI
from routes.tricks import router as tricks_router  # Importiere unseren neuen Tricks-Router

app = FastAPI()

# Bestehende Router
from routes.todo import router as trick_router
app.include_router(trick_router, prefix="/tricks")

# Unser neuer Router für Filter-Tricks
app.include_router(tricks_router, prefix="/tricks/filter")
