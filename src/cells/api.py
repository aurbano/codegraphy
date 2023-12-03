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


@router.get("/{cell_id}")
async def read_cell_contents(
    cell_id: Annotated[str, "Id of the cell to be read"],
    f: Annotated[str, "Path to a notebook folder to be opened"],
) -> CellContent:
    return cell_service.read_cell_contents(f, cell_id=cell_id)


@router.put("/{cell_id}")
async def save_cell_contents(
    cell_id: Annotated[str, "Id of the cell to be read"],
    f: Annotated[str, "Path to a notebook folder to be opened"],
    content: Annotated[str, Body(embed=True)],
) -> GraphModel:
    return cell_service.save_cell_contents(f, cell_id=cell_id, content=content)


@router.patch("/{cell_id}/run")
async def run_cell(
    cell_id: Annotated[str, "Id of the cell to be read"],
    f: Annotated[str, "Path to a notebook folder to be opened"],
) -> GraphModel:
    return cell_service.run_cell(f, cell_id=cell_id)
