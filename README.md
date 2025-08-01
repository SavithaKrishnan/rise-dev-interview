# Full Stack Interview Template

This repository contains a simple Flask API that connects to a public BigQuery dataset containing US Presidents

## Setup

1. **Fork this repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone <this-repo>
   cd rise-dev-interview
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Configure BigQuery Access**
   ```bash
   cp .env.example .env
   # Place the provided interview-credentials.json file in the project root
   ```

3. **Run the Application**
   ```bash
   python app.py
   ```
   
   Visit `http://localhost:5000` to see the app.

## Available Endpoints

- `GET /` - Hello World endpoint
- `GET /api/presidents` - Returns all US presidents from BigQuery

## Troubleshooting

- **"No module named 'google'"**: Make sure you've activated your virtual environment
- **BigQuery permission errors**: Ensure `interview-credentials.json` is in the project root
- **Port 5000 in use**: The app will automatically find another port, or specify one with `app.run(port=5001)`
