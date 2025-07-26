#!/usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";
import inquirer from "inquirer";
import open from "open";


const newline = "\n";
const label = (text) => chalk.bold.white(text.padEnd(14));

const data = {
  name: chalk.bold.white("Prasid Mandal"),
  title: chalk.gray("Web Developer & CS Student"),
  github: chalk.white("https://github.com/xodivorce"),
  linkedin: chalk.white("https://linkedin.com/in/xodivorce"),
  instagram: chalk.white("https://instagram.com/xodivorce"),
  web: chalk.white("https://www.xodivorce.in"),
  card: chalk.gray("npx") + " " + chalk.bold.white("xodivorce"),
  email: "hey@xodivorce.in",
  tagline: chalk.gray("On A Mission To Make The Web More Interesting.."),
};

const content = [
  `${data.name}`,
  `${data.title}`,
  ``,
  `${label("GitHub:")} ${data.github}`,
  `${label("LinkedIn:")} ${data.linkedin}`,
  `${label("Instagram:")} ${data.instagram}`,
  `${label("Website:")} ${data.web}`,
  ``,
  `${label("Install:")} ${data.card}`,
  ``,
  `${data.tagline}`,
].join(newline);

const boxed = boxen(content, {
  margin: 2,
  padding: { top: 1, bottom: 1, left: 12, right: 12 },
  borderStyle: "single",
  borderColor: "white",
  backgroundColor: "black",
});

console.log(boxed);

// Graceful exit on Ctrl+C
process.on("SIGINT", () => {
  console.log("\n" + chalk.bold.white("Exited gracefully."));
  process.exit(0);
});

// Main prompt
inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: chalk.bold.white("Select an option:"),
      choices: [
        {
          name: chalk.white("📧  Send Email"),
          value: async () => {
            try {
              console.log(chalk.gray("→ Opening email client..."));
              await open("mailto:" + data.email);
              console.log(chalk.green("✔ Email client opened."));
            } catch (error) {
              console.error(
                chalk.red("✖ Failed to open email client:"),
                chalk.gray(error?.message || "Unknown error")
              );
            }
          },
        },
        {
          name: chalk.white("📄  View Resume"),
          value: async () => {
            const fileUrl = "https://xodivorce.in/core/pdf_config.php";
            try {
              console.log(chalk.gray("→ Opening resume in browser..."));
              await open(fileUrl);
              console.log(
                chalk.green("✔ Resume opened in your default browser.")
              );
            } catch (error) {
              console.error(
                chalk.red("✖ Failed to open resume:"),
                chalk.gray(error?.message || "Unknown error")
              );
            }
          },
        },
        {
          name: chalk.white("📅  Setup Meeting"),
          value: async () => {
            try {
              console.log(chalk.gray("→ Opening calendar..."));
              await open("https://cal.com/xodivorce");
              console.log(
                chalk.green("✔ Calendar opened in your default browser.")
              );
            } catch (error) {
              console.error(
                chalk.red("✖ Failed to open calendar:"),
                chalk.gray(error?.message || "Unknown error")
              );
            }
          },
        },
        {
          name: chalk.gray("x   Exit"),
          value: () => {
            try {
              console.log("");
              console.log(chalk.bold.white("Thank you!"));
              console.log(chalk.gray("Have a great day."));
              console.log("");
              process.exit(0);
            } catch (error) {
              console.error(
                chalk.red("✖ Failed to exit:"),
                chalk.gray(error?.message || "Unknown error")
              );
              process.exit(1);
            }
          },
        },
      ],
      pageSize: 5,
    },
  ])
  .then(async (answer) => {
    if (typeof answer.action === "function") {
      await answer.action();
    }
  })
  .catch((error) => {
    console.error(
      chalk.red("✖ Unexpected error occurred:"),
      chalk.gray(error?.message || "Unknown error")
    );
    process.exit(1);
  });
