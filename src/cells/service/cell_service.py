from typing import Tuple

from src.graphs.domain.graph import CodeCellModel
from src.graphs.domain.graph import GraphModel, CellModel, CellReturnValue
from src.graphs.service.graph_service import GraphService
from .python_service import PythonService
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

        return graph

    def _get_cell_inputs(
        self, graph_model: GraphModel, to_cell: CellModel
    ) -> list[CellReturnValue]:
        links = [
            (link.to_cell.port, link.value)
            for link in graph_model.links
            if link.to_cell.id == to_cell.id
        ]
        links_sorted_by_port = sorted(links, key=lambda tup: tup[0])

        return [link[1] for link in links_sorted_by_port]

    def run_cell(self, graph_path: str, cell_id: str) -> GraphModel:
        graph_model, cell = self._get_graph_and_cell(graph_path, cell_id=cell_id)

        if cell.cell_type != "code":
            raise ValueError("Only code cells can be run")

        code_cell: CodeCellModel = cell

        try:
            fn = self._python_service.get_fn(
                graph_path, module_name=code_cell.file_name
            )
            inputs = self._get_cell_inputs(graph_model, to_cell=code_cell)
            outputs = self._python_service.run_method(fn, args=inputs)

            # Update output in the cell and any links
            cell_json = code_cell.dict()
            # Make an output parsing fn
            cell_json["outputs"] = [str(outputs)]

            new_cell = CodeCellModel.parse_obj(cell_json)

            # Replace cell
            graph_model.cells = [
                new_cell if c.id == code_cell.id else c for c in graph_model.cells
            ]

            return self._graph_service.update_graph(graph_path, new_graph=graph_model)
        except Exception as e:
            raise ValueError("Unable to run cell", e)
