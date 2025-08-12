import pytest
from unittest.mock import patch, MagicMock
from app import app  # Import Flask app

#with additional time, would return here to set up more rigorous and thorough tests

# Set up Flask test client
@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


# Helper function--creates mock BigQuery result so we don't ping actual db
def mock_bq_result(rows):
    mock_query_job = MagicMock()
    mock_query_job.result.return_value = rows
    return mock_query_job


# tests that call returns valid json with preserved order and correct keys
@patch("app.bigquery.Client")
def test_get_presidents(mock_bq_client, client):
    mock_rows = [
        {
            "Birthplace": "Westmoreland, Virginia",
            "Born": "Feb 22, 1732",
            "Died": "Dec 14, 1799",
            "Number": 1,
            "Party": "No Party",
            "President": "George Washington",
            "Tenure Length": "7 years, 10 months, 10 days",
            "Term End": "March 4, 1797",
            "Term Start": "April 30, 1789",
            "Vice President": "John Adams"
        },
        {
            "Birthplace": "Quincy, Massachusetts",
            "Born": "Oct 30, 1735",
            "Died": "Jul 4, 1826",
            "Number": 2,
            "Party": "Federalist",
            "President": "John Adams",
            "Tenure Length": "4 years, 0 months, 0 days",
            "Term End": "March 4, 1801",
            "Term Start": "March 4, 1797",
            "Vice President": "Thomas Jefferson"
        }
    ]
    mock_bq_client.return_value.query.return_value = mock_bq_result(mock_rows)

    response = client.get("/api/presidents")

    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert data[0]["President"] == "George Washington"
    assert "Term Start" in data[0]
    assert "Term End" in data[0]
    assert "Birthplace" in data[0]
    assert "Born" in data[0]
    assert "Died" in data[0]
    assert "Number" in data[0]
    assert "Party" in data[0]
    assert "Tenure Length" in data[0]
    assert "Vice President" in data[0]


#tests that call returns json with correct fields for correct president's data when match exists
@patch("app.bigquery.Client")
def test_search_by_date_found(mock_bq_client, client):
    mock_rows = [
        {"President": "Abraham Lincoln"
         , "Party": "Republican"
         , "Term Start": "March 4, 1861"
         , "Term End": "April 15, 1865"
         , "Tenure": "4 years, 1 months, 13 days" 
        }
    ]
    mock_bq_client.return_value.query.return_value = mock_bq_result(mock_rows)

    response = client.get("/api/search_by_date?search_date=1863-01-01")

    assert response.status_code == 200
    data = response.get_json()
    assert data["President"] == "Abraham Lincoln"
    assert "Party" in data
    assert "Term Start" in data
    assert "Term End" in data
    assert "Tenure" in data


#test that call returns error (404) when no matching president exists
@patch("app.bigquery.Client")
def test_search_by_date_not_found(mock_bq_client, client):
    mock_bq_client.return_value.query.return_value = mock_bq_result([])

    response = client.get("/api/search_by_date?search_date=1500-01-01")

    data = response.get_json()
    print(data)
    
    assert response.status_code == 404
    assert "error" in data


# checks that call returns valid json with fields required for visualizations
@patch("app.bigquery.Client")
def test_visualizations(mock_bq_client, client):
    mock_rows = [
        {"President": "Barack Obama", "Name_Year": "Barack Obama (2009)", "Age_At_Inauguration": 47, "Party": "Democratic"}
    ]
    mock_bq_client.return_value.query.return_value = mock_bq_result(mock_rows)

    response = client.get("/api/visualizations")

    assert response.status_code == 200
    data = response.get_json()
    assert data[0]["President"] == "Barack Obama"
    assert "Name_Year" in data[0]
    assert "Party" in data[0]
    assert "Age_At_Inauguration" in data[0]