from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)


def test_read_main() -> None:
    response = client.get("/api/")
    assert response.status_code == 200
    assert response.json() == {"version": 1}
