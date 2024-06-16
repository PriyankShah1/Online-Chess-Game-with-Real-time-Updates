# Online Chess Game with Real-time Updates

This project is a web-based chess game that allows two players to play against each other in real-time, with spectators able to watch the game. It features move validation, draggable pieces, and a move history tracker.

## Features

- Real-time updates using Socket.IO
- Move validation
- Draggable chess pieces
- Move history tracking
- Spectator mode
- Captured pieces display

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/online-chess-game.git
    ```

2. Navigate to the project directory:
    ```sh
    cd online-chess-game
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

1. Start the server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000` to start playing.

## Usage

### Playing the Game

- Players can drag and drop pieces to make moves.
- The board will automatically update to reflect the current state of the game.
- Move history is displayed on the side.
- Captured pieces are listed separately for each player.

### Spectator Mode

- Spectators can watch the game in real-time but cannot make moves.

## Project Structure

