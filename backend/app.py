from flask import Flask, jsonify, request
from flask_cors import CORS
from google.cloud import bigquery
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/api/presidents')
def get_presidents():
    project_id = 'rise-dev-interview'
    dataset_id = 'presidents'
    table_id = 'us_presidents'

    client = bigquery.Client(project=project_id)

    query = f"""
    SELECT * 
    FROM `{project_id}.{dataset_id}.{table_id}`
    ORDER BY Number ASC
    """

    query_job = client.query(query)
    results = query_job.result()

    presidents = []
    for row in results:
        presidents.append(dict(row))

    return jsonify(presidents)

@app.route('/api/search_by_date')
def get_president_by_date():
    search_date = request.args.get("search_date")
    project_id = 'rise-dev-interview'
    dataset_id = 'presidents'
    table_id = 'us_presidents'

    client = bigquery.Client(project=project_id)

    query = f"""
    SELECT President, Party, `Term Start`, `Term End`, `Tenure Length` 
    FROM `{project_id}.{dataset_id}.{table_id}`
    WHERE DATE('{search_date}') >= PARSE_DATE('%B %d, %Y', `Term Start`) 
        AND DATE('{search_date}') < 
            CASE 
                WHEN `Term End` = 'Present' THEN CURRENT_DATE() 
                ELSE PARSE_DATE('%B %d, %Y', `Term End`) 
            END
    """

    query_job = client.query(query)
    results = list(query_job.result())

    if not results:
        return jsonify({"error": "No president found. Try inputting a different between Feb 22, 1732 and today."}), 404

    presidents = []
    for row in results:
        presidents.append(dict(row))

    return jsonify(presidents[0])

@app.route('/api/visualizations')
def get_president_ages():
    project_id = 'rise-dev-interview'
    dataset_id = 'presidents'
    table_id = 'us_presidents'

    client = bigquery.Client(project=project_id)

    query = f"""
    SELECT President
        , CONCAT(President, ' (', EXTRACT(YEAR FROM PARSE_DATE('%B %d, %Y', `Term Start`)), ')') AS Name_Year
        , Party
        , DATE_DIFF(PARSE_DATE('%B %d, %Y', `Term Start`), PARSE_DATE('%b %d, %Y', Born), YEAR) AS Age_At_Inauguration
    FROM `{project_id}.{dataset_id}.{table_id}`
    ORDER BY Number
    """

    query_job = client.query(query)
    results = list(query_job.result())

    if not results:
        return jsonify({"error": "No result found."}), 404

    presidents = []
    for row in results:
        presidents.append(dict(row))

    return jsonify(presidents)

if __name__ == '__main__':
    app.run(debug=True)
    get_presidents()
