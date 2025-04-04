from typing import Annotated
from fastapi import APIRouter

from .domain.graph import GraphModel
from .service.graph_service import GraphService


graph_service = GraphService()

router = APIRouter(
    prefix="/graphs",
    tags=["graphs"],
)


@router.get("/")
async def read_graph(
    f: Annotated[str, "Path to a notebook folder to be opened"]
) -> GraphModel:
    return graph_service.read_graph(f)


@router.put("/")
async def update_graph(
    f: Annotated[str, "Path to a notebook folder to be opened"],
    new_graph: GraphModel,
) -> GraphModel:
    return graph_service.update_graph(f, new_graph=new_graph)
