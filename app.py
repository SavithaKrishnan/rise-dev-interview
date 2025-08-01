from flask import Flask, jsonify
from flask_cors import CORS
from google.cloud import bigquery
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/api/presidents')
def get_presidents():
    project_id = 'rise-dev-interview'
    dataset_id = 'presidents'
    table_id = 'us_presidents'

    client = bigquery.Client(project=project_id)

    query = f"""
    SELECT * 
    FROM `{project_id}.{dataset_id}.{table_id}`
    """

    query_job = client.query(query)
    results = query_job.result()

    presidents = []
    for row in results:
        presidents.append(dict(row))

    return jsonify(presidents)

if __name__ == '__main__':
    app.run(debug=True)