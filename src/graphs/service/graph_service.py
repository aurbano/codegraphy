import json

from ..domain.graph import GraphModel, CodeCellModel


class GraphService:
    def read_graph(self, file_path: str) -> GraphModel:
        file_path = self._get_graph_file_path(file_path)

        with open(file_path, mode="r") as f:
            data = json.load(f)
            graph_model = GraphModel.model_validate(data)

            if not self._validate_graph(graph_model):
                raise ValueError("Invalid graph!")

            return graph_model

    def update_graph(self, file_path: str, new_graph: GraphModel) -> GraphModel:
        file_path = self._get_graph_file_path(file_path)

        if not self._validate_graph(new_graph):
            raise ValueError("Invalid graph!")

        with open(file_path, mode="w") as f:
            json.dump(new_graph.dict(), fp=f, indent=2)

        return new_graph

    def _validate_graph(self, graph: GraphModel) -> bool:
        for link in graph.links:
            to_cells = [c for c in graph.cells if c.id == link.to_cell.id]
            if len(to_cells) != 1:
                raise ValueError(
                    f"Invalid graph! Attempting to link to non-existing cell (From {link.from_cell.id} to {link.to_cell.id})"
                )

            if to_cells[0].cell_type != "code":
                continue

            to_cell: CodeCellModel = to_cells[0]

            if link.to_cell.port >= len(to_cell.params):
                raise ValueError(
                    f"Invalid graph! Attempting to link to non-existing parameter ({link.to_cell.port})"
                )

        return True

    def _get_graph_file_path(self, file_path: str) -> str:
        if ".json" not in file_path:
            file_path = f"{file_path}/nb.json"

        return file_path
