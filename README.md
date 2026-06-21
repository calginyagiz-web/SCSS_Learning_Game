# Sass Wrestle - Noir Style React Game 

Sass Wrestle is an interactive, two-player technical duel and tug-of-war game featuring a dark comic book (noir) atmosphere, built using Frontend (React & SCSS) technologies. Players take turns answering SCSS/Sass questions to pull the central "Compiler Hammer" toward their side and knock out the opponent.

## Key Features

- **Dynamic Game Loop (Tug-of-War Mechanics):** Every correct answer launches the hammer toward the opponent, while incorrect answers drag the hammer closer to the player's own base. Reaching the boundary results in an instant knockout.
- **Advanced Timer System:**
  - **Reading Time:** Players get a 5-second safe window to analyze the question before the pressure starts.
  - **Hammer Drift:** Once the reading time expires, the hammer automatically drifts against the active player, adding real-time tension to the gameplay.
- **Special Ability (Time Freeze):** Includes a strategic mechanic allowing each player to freeze the countdown timer for 5 seconds once per game.
- **Modern SCSS Architecture:** Developed using the latest Dart Sass standards, featuring modular `@use` rules, variables, and flexible layouts.
- **Dynamic Data Management:** Questions are fetched sequentially from a local JSON structure (`mancanikDB.questions.json`) according to a structured difficulty curve (Easy -> Medium -> Hard).

## Tech Stack

- **Frontend Framework:** React (Hooks: `useState`, `useEffect`)
- **Build Tool:** Vite
- **Styling:** SCSS / Sass (Dart Sass `@use` structure)
- **Asset Design:** Noir & Comic Book Art Style

## Installation and Setup

Follow these steps to run the project locally:

1. Clone the repository:
```bash
git clone [https://github.com/calginyagiz-web/SCSS_Learning_Game.git](https://github.com/calginyagiz-web/SCSS_Learning_Game.git)
