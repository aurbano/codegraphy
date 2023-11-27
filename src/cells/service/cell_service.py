from typing import Tuple

from .python_service import PythonService
from src.graphs.domain.graph import GraphModel, CellModel, CellReturnValue
from src.graphs.service.graph_service import GraphService
from ..domain.cell import CellContent


class CellService:
    _graph_service = GraphService()
    _python_service = PythonService()

    def _get_graph_and_cell(
        self, file_path: str, cell_id: str
    ) -> Tuple[GraphModel, CellModel]:
        graph = self._graph_service.read_graph(file_path)
        cell = [cell for cell in graph.cells if cell.id == cell_id]

        if len(cell) != 1:
            raise ValueError(f"Unable to find cell {cell_id}")

        return graph, cell[0]

    def read_cell_contents(self, file_path: str, cell_id: str) -> CellContent:
        _, cell = self._get_graph_and_cell(file_path, cell_id=cell_id)

        if cell.cell_type == "input":
            raise ValueError("Only code cells can be loaded")

        file_name = cell.file_name

        with open(f"{file_path}/src/{file_name}", mode="r") as f:
            return CellContent(content=f.read())

    def save_cell_contents(
        self, graph_path: str, cell_id: str, content: str
    ) -> GraphModel:
        graph, cell = self._get_graph_and_cell(graph_path, cell_id=cell_id)

        if cell.cell_type == "input":
            raise ValueError("Only code cells can be loaded")

        file_name = cell.file_name
        file_path = f"{graph_path}/src/{file_name}"

        with open(file_path, mode="w") as f:
            f.write(content)

        return self.run_cell(graph_path, cell_id=cell_id)

    def _get_cell_inputs(
        self, graph_model: GraphModel, from_cell: CellModel
    ) -> list[CellReturnValue]:
        inputs: list[CellReturnValue] = []

        graph_model.links = [
            link for link in graph_model.links if link.from_cell == link.from_cell.id
        ]

        for link in graph_model.links:
            # TODO: Figure out which order the inputs should go in

            if from_cell is None:
                raise ValueError(
                    f"Found {len(from_cell)} cells with the id {link.from_cell.id}"
                )

            # from_cell = from_cell[0]
            inputs.append(link.value)

        return inputs

    def run_cell(self, graph_path: str, cell_id: str) -> GraphModel:
        graph_model, cell = self._get_graph_and_cell(graph_path, cell_id=cell_id)

        try:
            pass
            # fn = self._python_service.get_fn(file_path)
            # inputs = self._get_cell_inputs(graph_model, )
            # output = self._python_service.run_method(fn, [1, 2, 4])
        except Exception:
            raise ValueError("Unable to run cell")
        return graph_model
