const inquirer = require('inquirer');
const { Octokit } = require("@octokit/rest");
const chalk = require('chalk');

async function authenticate(){
    //1. create question
     const question = [{
         name: 'token',
         type: 'input',
         message: chalk.yellow.bold('Enter your Github personal access token.'),
         validate: function(value) {
            if (value.length == 40) {
                return true;
             } else return chalk.gray.bold('Please enter a valid token. If you need to generate one, do so at github settings > developer settings > personal access token');
          }
     }];
     //2. prompt question
     const answer = await inquirer.prompt(question);
  
     //3. try authenticating with user's answer
     try{
        const octokit = new Octokit({
          auth: answer.token,
        }); 
        return octokit;
     //4. print error if any
     }catch (error){
        console.log(error);
     }
  }
  
  //5. export for use in index.js
  module.exports = {authenticate}
  
