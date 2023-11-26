from src.graphs.service.graph_service import GraphService


class CellService:
    graph_service = GraphService()
    # TODO: Add a graph validator (outputs, params, links, repeated ids... )

    def read_cell_contents(self, file_path: str, cell_id: str) -> str:
        graph = self.graph_service.read_graph(file_path)
        cell = [cell for cell in graph.cells if cell.id == cell_id]

        if len(cell) != 1:
            raise ValueError(f"Unable to find cell {cell_id}")

        code_cell = cell[0]

        if code_cell.cell_type == "input":
            raise ValueError("Only code cells can be loaded")

        file_name = code_cell.file_name

        with open(f"{file_path}/src/{file_name}", mode="r") as f:
            return f.read()
