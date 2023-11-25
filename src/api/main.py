from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()


class ApiRoot(BaseModel):
    version: int


@app.get("/api/")
def read_root() -> ApiRoot:
    return ApiRoot(version=1)


app.mount("/", app=StaticFiles(directory="web/dist", html=True), name="web")
