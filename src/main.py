from fastapi import APIRouter, FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

from src import graphs, cells

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(
    prefix="/api",
)


class ApiRoot(BaseModel):
    version: int


@router.get("/")
def read_root() -> ApiRoot:
    return ApiRoot(version=1)


router.include_router(graphs.router)
router.include_router(cells.router)

app.include_router(router)
app.mount("/", app=StaticFiles(directory="web/dist", html=True), name="web")
