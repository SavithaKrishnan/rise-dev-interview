# Rise Dev Interview Project

A full-stack demo project featuring a *Flask API* connected to BigQuery and a *React frontend* for exploring U.S. presidents data.

---

##  Features

- **Backend (Flask + BigQuery)**  
  - `GET /api/presidents`: Retrieves a list of all U.S. presidents.  
  - `GET /api/search_by_date?search_date=YYYY-MM-DD`: Returns the president serving on a specific date.
  - `GET /api/visualizations`: Returns presidents and their age at inauguration

- **Frontend (React + Chakra UI)**  
  - Displays a table of presidents, their birth/death info and data about their term.  
  - Includes a date-picker search to find the president in office on the chosen date.  
  - Visualizes president's age at inauguration over time through a bar chart.

---

##  Architecture

```
┌─────────────┐ ┌─────────────────┐ ┌───────────┐
│ React UI │ <–––> │ Flask API │ <–––> BigQuery |
└─────────────┘ └─────────────────┘ └───────────┘
```

---

##  Local Setup

### Backend

1. Clone the repo:
   ```bash
   git clone https://github.com/SavithaKrishnan/rise-dev-interview.git
   cd rise-dev-interview
   ```

2. Set up a virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Provide GCP credentials:
   ```bash
   cp .env.example .env
   # Place the provided interview-credentials.json file in the project root
   ```

4. Run the Flask server:
   ```bash
   python app.py
   ```
   
   The API is available at http://127.0.0.1:5000/.

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run start
   ```
   
   Visit the app at http://localhost:3000/.

---

## Project Structure

```
rise-dev-interview/
├── backend/
│   ├── app.py                                     # Flask API + BigQuery integration to access Presidents data
│   ├── test_app.py                                # Tests for the API endpoints
│   ├── requirements.txt
│   ├── .env.example
│   └── interview-credentials.json (gitignored)
└── frontend/
    ├── package.json
    ├── public/
    └── src/
         ├──index.tsx
         ├── App.tsx                               # main UI page
         └── components                            # contains components for header + each tab in index.tsx
               ├── BarChart.tsx
               ├── Header.tsx
               ├── SearchByYear.tsx
               └── Table.tsx
```

---

## Additional Notes

### AI Usage

I had never built a visualization in a React framework, so I used AI to figure out the general format for a bar chart.

### Time Usage

In the 4 hour time limit, I completed app setup, API ednpoint setup and UI setup for the table and the search-by-date feature. With some additional time, I completed the visualization in the third tab, aesthetic changes, and an API endpoint test file. With even more time, I would address some of the points below!

### Additional Features & Future Roadmap

- More dynamic table with pagination and search panel (sorting, pagination, filtering)
- Joining in other data sources (voting records, etc.) to create more content and allow for more of a narrative to the app
- Method of authentication (Auth0?)
- More automated testing (especially for frontend)
- Small aesthetic fixes especially for the visualization in last tab
- Deploy app to a public production environment (e.g. Vercel, Google Cloud Run).



# [Original Instructions Below] Full Stack Interview Template

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

## Future Improvements
- Make the table in the 'All Presidents' tab sortable for all fields except Date fields and maybe VP field.
- Add validation for search date entry in 'Search By Date' tab.


##Rough Instruction to get this up and running

