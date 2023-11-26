from typing import Annotated
from fastapi import APIRouter

from .service.cell_service import CellService

cell_service = CellService()

router = APIRouter(
    prefix="/cells",
    tags=["cells"],
)


@router.get("/")
async def read_cell_contents(
    f: Annotated[str, "Path to a notebook folder to be opened"],
    cell_id: Annotated[str, "Id of the cell to be read"],
) -> str:
    return cell_service.read_cell_contents(f, cell_id=cell_id)
