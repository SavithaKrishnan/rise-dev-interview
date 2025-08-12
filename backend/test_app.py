import pytest
from unittest.mock import patch, MagicMock
from app import app  # Import your Flask app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


# Helper function to create a mock BigQuery result
def mock_bq_result(rows):
    mock_query_job = MagicMock()
    mock_query_job.result.return_value = rows
    return mock_query_job


@patch("app.bigquery.Client")
def test_get_presidents(mock_bq_client, client):
    mock_rows = [
        {"President": "George Washington", "Number": 1},
        {"President": "John Adams", "Number": 2}
    ]
    mock_bq_client.return_value.query.return_value = mock_bq_result(mock_rows)

    response = client.get("/api/presidents")

    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert data[0]["President"] == "George Washington"


@patch("app.bigquery.Client")
def test_search_by_date_found(mock_bq_client, client):
    mock_rows = [
        {"President": "Abraham Lincoln", "Party": "Republican"}
    ]
    mock_bq_client.return_value.query.return_value = mock_bq_result(mock_rows)

    response = client.get("/api/search_by_date?search_date=1863-01-01")

    assert response.status_code == 200
    data = response.get_json()
    assert data["President"] == "Abraham Lincoln"


@patch("app.bigquery.Client")
def test_search_by_date_not_found(mock_bq_client, client):
    mock_bq_client.return_value.query.return_value = mock_bq_result([])

    response = client.get("/api/search_by_date?search_date=1500-01-01")

    assert response.status_code == 404
    data = response.get_json()
    assert "error" in data


@patch("app.bigquery.Client")
def test_visualizations(mock_bq_client, client):
    mock_rows = [
        {"President": "Barack Obama", "Name_Year": "Barack Obama (2009)", "Age_At_Inauguration": 47}
    ]
    mock_bq_client.return_value.query.return_value = mock_bq_result(mock_rows)

    response = client.get("/api/visualizations")

    assert response.status_code == 200
    data = response.get_json()
    assert data[0]["President"] == "Barack Obama"