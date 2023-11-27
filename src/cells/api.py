from typing import Annotated
from fastapi import APIRouter, Body

from src.graphs.domain.graph import GraphModel
from .domain.cell import CellContent
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
) -> CellContent:
    return cell_service.read_cell_contents(f, cell_id=cell_id)


@router.put("/")
async def save_cell_contents(
    f: Annotated[str, "Path to a notebook folder to be opened"],
    cell_id: Annotated[str, "Id of the cell to be read"],
    content: Annotated[str, Body(embed=True)],
) -> GraphModel:
    return cell_service.save_cell_contents(f, cell_id=cell_id, content=content)
