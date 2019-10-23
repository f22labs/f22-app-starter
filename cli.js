#!/usr/bin/env node

const inquirer = require("inquirer");
const shell = require("shelljs");
const chalk = require("chalk");

console.log(chalk.red("Hi, welcome to F22 Labs Starter Kit"));

function fancyLog(log) {
  console.log("\n===================");
  console.log(chalk.green(log));
  console.log("===================\n\n");
}
const questions = [
  {
    type: "list",
    name: "projectType",
    message: "What kind of project are you starting ?",
    choices: ["React", "React Native"],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
    type: "input",
    name: "projectName",
    message: "Enter the name of the project ",
    validate: function(input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) {
        return true;
      } else {
        return "Project name may only include letters, numbers, underscores and hashes.";
      }
    }
  }
];

inquirer.prompt(questions).then(answers => {
  const { projectType, projectName } = answers;

  if (projectType === "react") {
    // Clone React repo
    console.log("Work in Progress");
  } else {
    fancyLog("We are setting up things for you");

    shell.exec(
      `git clone git@github.com:f22labs/rn-boilerplate.git ${projectName}`
    );
    shell.cd(projectName);
    shell.rm("-rf", ".git");
    shell.exec("yarn");
    shell.exec(`yarn rename ${projectName}`);
    shell.cd("ios");
    shell.exec("pod install");

    fancyLog("Done");
  }
});
