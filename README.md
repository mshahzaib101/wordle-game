# Wordle Game (Single & Multiplayer Version)

This project is a server/client implementation of the popular **Wordle** game built using **Next.js** (App Router APIs for server-side functionality) and **Firebase** for storing game configurations, player data, and multiplayer support. The game provides an enhanced user experience with animations, sounds, and an updated UI to create a more engaging and immersive gameplay experience.

## Features

1. **Game Modes**:
   - **Single Player**: Play against the game by guessing a 5-letter word within a set number of rounds.
   - **Multiplayer**: Play with friends in a shared game session. The game ends when one of the players wins.

2. **Word Guessing Logic**:
   - A 5-letter word is randomly selected by the server and is kept hidden from the client.
   - Players input guesses and receive feedback after each attempt:
     - **Hit**: Letter is correct and in the correct position.
     - **Present**: Letter is correct but in the wrong position.
     - **Miss**: Letter is not in the word.
   - In multiplayer mode, the game ends when any user guesses the word correctly.

3. **Server-Side Validation**:
   - The server handles the validation of each guess to ensure it follows the game's logic.
   - The answer is securely managed on the server and is only revealed to the client upon game over or successful guess.

4. **Client-Side Enhancements**:
   - The game UI includes animations and game sounds to enhance the user experience.
   - Real-time feedback is provided on the screen, and toast notifications are used for warnings and errors (e.g., invalid guesses).

5. **Game Configuration**:
   - Admins can configure the game from a dedicated configuration page (`/configuration`).
   - Configurable options include:
     - **Max Rounds**: Set the maximum number of attempts allowed per game.
     - **Word List**: Define the list of 5-letter words from which the answer is randomly selected.
   - Configurations are saved in **Firebase** for persistence.

6. **Multiplayer Game Support**:
   - Players can choose between single-player or multiplayer modes.
   - In multiplayer mode, users enter their name and join the game via a unique invite link that can be shared with others.
   - There is no limit to the number of players who can join the game.
   - The game session ends once any player wins.

7. **Firebase Realtime Database**:
   - **Firebase Realtime Database** is used for managing user data and game state in multiplayer mode.
   - The server-side APIs interact with Firebase to store player information, guesses, and game results in real-time.

8. **Animations & Sounds**:
   - **Framer Motion** is used for smooth animations during gameplay (e.g., tile flip animations).
   - Sound effects are played on user actions, such as correct guesses, incorrect guesses, and game-over notifications.

## Installation

To run the game locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/mshahzaib101/wordle-game.git
    ```

2. Navigate to the project directory:

    ```bash
    cd wordle-game
    ```

3. Install dependencies:

    ```bash
    yarn
    ```

4. Set up .env file
      ```

5. Run the development server:

    ```bash
    yarn dev
    ```

6. Open the game in your browser at `http://localhost:3000`.

## Project Structure

```bash
wordle-game/
├── .next/
├── node_modules/
├── public/
│   ├── favicon.ico
├── src/
│   ├── app/
│   │   ├── api/               # Server-side API routes (handles word and guess validation)
│   │   ├── configuration/     # Admin configuration page
│   │   ├── fonts/
│   │   ├── play/              # Single-player game page
│   │   ├── multiplayerPlay/   # Multiplayer game page
│   │   ├── playerRegistration/# Player registration for multiplayer mode
│   ├── components/            # UI components
│   │   ├── common/
│   │   ├── configuration/
│   │   ├── home/
│   ├── lib/
│   │   ├── firebase.js        # Firebase configuration
│   │   ├── firebase-server.js # Firebase server-side functions
│   │   ├── sounds.js          # Game sounds handling
│   ├── services/
│   │   ├── game.js            # Game logic (server-side validation)
│   ├── utils/
│   │   ├── functions/         # Helper functions
├── .gitignore
├── .eslintrc.json
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json


## Dependencies

The project uses the following key libraries and tools:

- **Next.js**: `^14.2.15` (with App Router API for server-side functionality)
- **React**: `^18`
- **Tailwind CSS**: `^3.4.1`
- **Framer Motion**: `^11.11.9` (for animations)
- **Firebase Admin SDK**: `^12.6.0`
- **Firebase Realtime Database**: `^10.14.1`
- **React Toastify**: `^10.0.6` (for notifications)
- **React Confetti**: `^6.1.0` (for celebration animations)
- **React Select**: `^5.8.1` (for multi-select options in admin config)
- **UUID**: `^10.0.0` (for generating unique identifiers)

## How to Play

1. **Single Player Mode**:
   - Input a 5-letter word and press **Enter**.
   - The server validates the guess and provides feedback on the screen:
     - **Hit**: The letter is correct and in the right spot (Green).
     - **Present**: The letter is correct but in the wrong spot (Yellow).
     - **Miss**: The letter is not in the word (Gray).
   - Keep guessing until you either guess the word correctly or run out of rounds.

2. **Multiplayer Mode**:
   - Select multiplayer mode and enter your name.
   - Once registered, you will be redirected to the game page, where you can invite others to join via a unique invite link.
   - Multiple players can join the game, and the game will end once one player correctly guesses the word.
   - The game can have unlimited participants.

3. If you win, you'll see a celebratory animation with confetti. If you lose, the correct word will be revealed, and you can restart the game.

## Admin Configuration

Admins can access the configuration page (`/configuration`) to update the game's settings:

- **Max Rounds**: Set the maximum number of rounds allowed in the game.
- **Word List**: Add or remove 5-letter words from the list of possible answers.
- **Admin Password**: To access the configuration page, admins must enter the correct password.

Configuration changes include:
- Modifying the list of 5-letter words that are used as possible answers.
- Setting a limit for the maximum number of guesses allowed for each game session.

To update the game settings:
1. Navigate to the `/configuration` page.
2. Enter the admin password.
3. Modify the settings as needed (max rounds, word list).
4. Save the configuration.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, feel free to contact the project maintainer at [mshahzaib101ed@gmail.com].
