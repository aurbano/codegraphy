import json

from ..domain.graph import GraphModel


class GraphService:
    def read_graph(self, file_path: str) -> GraphModel:
        file_path = self._get_graph_file_path(file_path)

        with open(file_path, mode="r") as f:
            data = json.load(f)
            return GraphModel.model_validate(data)

    def update_graph(self, file_path: str, new_graph: GraphModel) -> GraphModel:
        file_path = self._get_graph_file_path(file_path)

        with open(file_path, mode="w") as f:
            json.dump(new_graph.dict(), fp=f, indent=2)

        return new_graph

    def _get_graph_file_path(self, file_path: str) -> str:
        if ".json" not in file_path:
            file_path = f"{file_path}/nb.json"

        return file_path
