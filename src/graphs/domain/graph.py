from typing import Literal, Union
from pydantic import BaseModel


class KernelModel(BaseModel):
    display_name: str
    language: str
    name: str


class MetadataModel(BaseModel):
    kernels: list[KernelModel]
    graph_version: int
    graph_version_minor: int


PortId = str | int
CellReturnValue = str | int | None


class CellPosition(BaseModel):
    x: int
    y: int


class BaseCellModel(BaseModel):
    id: str
    cell_type: str
    returns: list[PortId]
    position: CellPosition


class CodeCellModel(BaseCellModel):
    cell_type: Literal["code"]
    file_name: str
    kernel: str
    params: list[PortId]
    execution_count: int
    execution_time: float | None
    outputs: list[str]


class InputCellModel(BaseCellModel):
    cell_type: Literal["input"]
    label: str
    type: Literal["text", "number", "email"]
    value: CellReturnValue


CellModel = Union[CodeCellModel, InputCellModel]


class LinkItemModel(BaseModel):
    id: str
    port: int


class LinkModel(BaseModel):
    from_cell: LinkItemModel
    to_cell: LinkItemModel
    value: CellReturnValue


class GraphModel(BaseModel):
    metadata: MetadataModel
    cells: list[CellModel]
    links: list[LinkModel]
