# Close Enough

"Close Enough" is a real-time multiplayer trivia game where exact answers aren't expected—but being close counts! Players compete to guess numerical answers to trivia questions by providing a range (min and max).

## How to Play

1.  **Create or Join a Room**:
    *   Enter your name and click "CREATE ROOM" to start a new game.
    *   Or, enter a room code and click "JOIN ROOM" to join an existing lobby.
2.  **The Game Loop**:
    *   **Question**: A numerical trivia question is presented (e.g., "How many ridges are on a dime?").
    *   **Answer**: Players submit a **Minimum** and **Maximum** value to define their guess range.
    *   **Reveal**: The correct answer is revealed.
3.  **Scoring**:
    *   **Correct Range**: You score points if the correct answer falls *within* your specified range.
    *   **Risk vs. Reward**: Smaller ranges yield more points!
        *   **Exact Match**: 5 points (Min = Max = Answer)
        *   **Best Range**: 3 points (Smallest valid range among players)
        *   **Valid Range**: 1 point (Answer is within range, but not the smallest)

## Installation & Running

1.  **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start the Server**:
    ```bash
    node server.js
    ```
4.  **Play**: Open your browser and navigate to `http://localhost:3000` (or the port specified in the console).

## Tech Stack

*   **Backend**: Node.js, Express, Socket.io
*   **Frontend**: HTML, CSS, JavaScript (Vanilla)
*   **Real-time Communication**: Socket.io
