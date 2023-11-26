from typing import Literal, TypeAlias, Union
from pydantic import BaseModel


class KernelModel(BaseModel):
    display_name: str
    language: str
    name: str


class MetadataModel(BaseModel):
    kernels: list[KernelModel]
    graph_version: int
    graph_version_minor: int


CellType: TypeAlias = Literal["input", "code"]
PortId = Union[str, int]


class CellPosition(BaseModel):
    x: int
    y: int


class CellModel(BaseModel):
    id: str
    cell_type: CellType
    returns: list[PortId]
    position: CellPosition


class CodeCellModel(CellModel):
    cell_type: Literal["code"]
    file_name: str
    kernel: str
    params: list[PortId]
    execution_count: int
    execution_time: float | None
    outputs: list[str]


class InputCellModel(CellModel):
    cell_type: Literal["input"]
    label: str
    type: Literal["text", "number", "email"]
    value: Union[str, int]


class LinkItemModel(BaseModel):
    id: str
    port: PortId


class LinkModel(BaseModel):
    from_cell: LinkItemModel
    to_cell: LinkItemModel


class GraphModel(BaseModel):
    metadata: MetadataModel
    cells: list[Union[CodeCellModel, InputCellModel]]
    links: list[LinkModel]
