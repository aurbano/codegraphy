import json

from ..domain.graph import GraphModel


class GraphService:
    def read_graph(self, file_path: str) -> GraphModel:
        if ".json" not in file_path:
            file_path = f"{file_path}/nb.json"

        with open(file_path, mode="r") as f:
            data = json.load(f)
            return GraphModel.model_validate(data)

    def update_graph(self, file_path: str, new_graph: GraphModel) -> GraphModel:
        # TODO: Save the new graph to file
        return new_graph
