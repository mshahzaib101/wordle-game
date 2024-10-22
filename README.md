# Wordle Game

A web-based implementation of the popular word guessing game **Wordle** built with **Next.js** and styled using **Tailwind CSS** and **Tailwind UI**. This game allows players to guess a randomly selected 5-letter word within a limited number of attempts. The game also features configurable settings for both the word list and the number of guessing rounds.

## Features

1. **Word Guessing Logic**:
   - A 5-letter word is randomly selected from a predefined list.
   - Players can input their guesses, and feedback is provided based on the accuracy of their guess:
     - **Hit**: The letter is in the correct position.
     - **Present**: The letter is in the word but in the wrong position.
     - **Miss**: The letter is not in the word.
   - The game checks for case-insensitive inputs.
   - The game ends when the player either correctly guesses the word or uses up all available rounds.

2. **Configurable Settings**:
   - **Word List**: The game administrator can configure the list of 5-letter words.
   - **Max Rounds**: The maximum number of attempts (rounds) a player has to guess the word can be adjusted.
   - These configurations are accessible via the `/configuration` page.

3. **Player Win/Loss Conditions**:
   - **Win**: The player wins by guessing the correct word within the maximum allowed rounds.
   - **Lose**: The player loses if they fail to guess the word after using all rounds.

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

4. Run the development server:

    ```bash
    yarn dev
    ```

5. Open the game in your browser at `http://localhost:3000`.

## Configuration

The game offers the ability to modify certain configurations via the `/configuration` page.

### Game Settings:
- **Max Rounds**: Set the maximum number of guessing rounds before the game ends.
- **Word List**: Add, remove, or update the list of possible 5-letter words.
- **Admin Access**: You will need to input the correct admin password to apply changes to the configuration.

## Dependencies

The project uses the following libraries and tools:

- **Next.js**: `^14.2.15`
- **React**: `^18`
- **Tailwind CSS**: `^3.4.1`
- **React Confetti**: `^6.1.0`
- **React Select**: `^5.8.1`
- **React Toastify**: `^10.0.6`
- **@headlessui/react**: `^2.1.10`
- **@heroicons/react**: `^2.1.5`


## How to Play

1. Input a 5-letter word and press **Enter**.
2. The game will provide feedback for each letter in the guess:
   - **Hit**: The letter is correct and in the right spot (Green).
   - **Present**: The letter is correct but in the wrong spot (Yellow).
   - **Miss**: The letter is not in the word (Gray).
3. Keep guessing until you either guess the word correctly or run out of rounds.
4. If you win, you'll see a congratulatory message. If you lose, the correct word will be displayed.

## Admin Configuration

To access and modify game configurations, go to the `/configuration` page. You will need to provide the correct admin password to make changes to the following settings:

- **Max Rounds**: The maximum number of guesses allowed before game over.
- **Word List**: Add or remove 5-letter words from the list of possible answers.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, feel free to contact the project maintainer at [mshahzaib101ed@gmai.com].
