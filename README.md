# Gym Coach Web App

A responsive gym coach application built for mobile and desktop browsers. It stores data locally in your browser and supports:

- Dynamic gym program generation based on goal, equipment, and weekly training days
- Body weight tracking with date entries
- Meal plan tracking with meal description, calories, and notes
- Responsive layout for mobile and PC

## Files

- `index.html` — user interface
- `styles.css` — responsive styling
- `app.js` — data storage and interaction logic
- `gym_coach.py` — command-line gym coach helper
- `class GymCoach:.py` — example Python class for coach logic

## Run locally

Open `index.html` directly in a browser, or serve the project with a local static server:

```bash
python -m http.server 8000
```

Then visit:

```bash
http://localhost:8000
```

## Usage

1. Enter your name, training goal, equipment, and days per week.
2. Save to generate a dynamic weekly workout program.
3. Log body weight entries.
4. Track meal plans and calories.

## Notes

- Data is saved locally in the browser using `localStorage`.
- The interface is designed to work on mobile and desktop devices.
