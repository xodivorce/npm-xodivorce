#!/usr/bin/env node
import chalk from "chalk";
import boxen from "boxen";
import inquirer from "inquirer";
import open from "open";
import os from "os";
import fs from "fs";
import https from "https";
import path from "path";

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
  padding: { top: 1, bottom: 1, left: 12, right: 12},
  borderStyle: "single",
  borderColor: "white",
  backgroundColor: "black",
});

console.log(boxed);

inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: chalk.bold.white("Select an option:"),
      choices: [
        {
          name: chalk.white("📧  Send Email"),
          value: () => {
            console.log(chalk.gray("→ Opening email client..."));
            return open("mailto:" + data.email);
          },
        },
        {
          name: chalk.white("📄  Download Resume"),
          value: () => {
            const fileUrl = "https://xodivorce.in/assets/pdf/CV_PRASID.pdf";
            const downloadPath = path.join(os.homedir(), "prasid-mandal-resume.pdf");
            console.log(chalk.gray("→ Downloading Resume..."));

            const file = fs.createWriteStream(downloadPath);

            https.get(fileUrl, (response) => {
              response.pipe(file);

              file.on("finish", () => {
                file.close(() => {
                  console.log(chalk.green("✔ Resume Downloaded at: ") + chalk.white(downloadPath));
                });
              });
            }).on("error", (err) => {
              fs.unlink(downloadPath, () => {});
              console.error(chalk.red("✖ Download failed:"), chalk.gray(err.message));
            });
          },
        },
        {
          name: chalk.white("📅  Book a Meeting"),
          value: () => {
            console.log(chalk.gray("→ Opening calendar..."));
            return open("https://cal.com/xodivorce");
          },
        },
        {
          name: chalk.gray("x   Exit"),
          value: () => {
            console.log("");
            console.log(chalk.bold.white("Thank you!"));
            console.log(chalk.gray("Have a great day."));
            console.log("");
            process.exit(0);
          },
        },
      ],
      pageSize: 5,
    },
  ])
  .then((answer) => {
    return answer.action();
  })
  .catch((error) => {
    console.error(chalk.white("Error:"), chalk.gray(error.message));
    process.exit(1);
  });
