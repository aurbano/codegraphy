from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class ApiRoot(BaseModel):
    version: int


@app.get("/")
def read_root() -> ApiRoot:
    return ApiRoot(version=1)
