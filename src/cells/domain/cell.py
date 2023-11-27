from pydantic import BaseModel


class CellContent(BaseModel):
    content: str
