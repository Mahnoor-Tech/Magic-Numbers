#! /usr/bin/env node
import inquirer from "inquirer";
import boxen from "boxen";
import chalk from "chalk";

console.log(
  boxen("\x1b[31mNUMBER GUESSING GAME\x1b[1m", {
    padding: 1.3,
    margin: 1,
    borderStyle: "double",
    borderColor: "#f7d800",
    backgroundColor: "#f7d800",
  })
);

let computerGeneratedNumber: number = Math.floor(Math.random() * 6 + 1);
let rounds: number = 3;
let score: number = 0;

const player = await inquirer.prompt([
  {
    name: "playerName",
    type: "string",
    message: chalk.hex("#f7d800")("Player Name: "),
  },
]);

const playerName = player.playerName.toUpperCase();

while (rounds <= 3) {
  console.log(
    chalk
      .hex("#ffffff")
      .bgRed(
        `\n  ROUND: ${rounds.toString().padStart(1, "")}  SCORE: ${score}  \n`
      )
  );

  const guess_number = await inquirer.prompt([
    {
      name: "userGuessNumber",
      type: "number",
      message: chalk.hex("#f7d800")("Please guess a number between 1 and 6: "),
    },
  ]);

  // Destructuring...
  const { userGuessNumber } = guess_number;

  // console.log(
  //   `User Guess Number: ${userGuessNumber}\nSystem Generated Number: ${computerGeneratedNumber}\n`
  // );

  if (userGuessNumber === computerGeneratedNumber) {
    score++;
    console.log(
      chalk
        .hex("#ffffff")
        .bgRed(`\n  SCORE: ${score.toString().padStart(1, "")}  `)
    );
    console.log(
      chalk
        .hex("#ffffff")
        .bgGreen(
          `\n  CONGRATULATIONS, ${playerName
            .toString()
            .padStart(1, "")}! You guessed the right number.  \n`
        )
    );

    break;
  } else {
    console.log(
      chalk
        .hex("#f60002")
        .bgWhite(
          `\n  Oopss! Try Again, ${playerName
            .toString()
            .padStart(1, "")}. Better Luck Next Time!  \n`
        )
    );
    rounds--;
  }

  // rounds
  if (rounds <= 0) {
    console.log(
      chalk.hex("#ffffff").bgRed(`\n  Game Over. 3 rounds completed.  \n`)
    );
    break;
  }

  // HINTS
  if (userGuessNumber > computerGeneratedNumber) {
    console.log(`[Hint: The number is lower.]\n`);
  } else {
    console.log(`[Hint: The number is higher.]\n`);
  }
}
